import { useEffect, useMemo, useRef, useState } from 'react';
import { Segmented, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import type { DashboardMapViews, MapViewMode } from '../../types/dashboard';

type AnhuiDistrictMapProps = {
  mapViews: DashboardMapViews;
};

type ViewMeta = {
  title: string;
  description: string;
  badge: string;
  countLabel: string;
  seriesName: string;
  geoPath: string;
  mapName: string;
  zoom: number;
  layoutCenter: [string, string];
  layoutSize: string;
  visualRange: string[];
  labelZoomThreshold: number;
  labelFontSize: number;
  labelStep: number;
};

type GeoFeatureCollection = {
  type: 'FeatureCollection';
  features: unknown[];
};

type TooltipLikeParams = {
  name: string;
  value: unknown;
  seriesType?: string;
};

type GeoOptionState = {
  geo?: Array<{
    zoom?: number;
  }>;
};

const GEO_CACHE = new Map<string, GeoFeatureCollection>();
const ZOOM_MIN = 0.78;
const ZOOM_MAX = 2.88;

const clampZoomFactor = (value: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number(value.toFixed(2))));

const formatRegionLabel = (mode: MapViewMode, name: string) => {
  if (mode === 'city') {
    return name.replace(/市$/, '');
  }

  if (mode === 'surrounding') {
    return name.replace(/省$/, '').replace(/市$/, '');
  }

  return name;
};

const viewMetaMap: Record<MapViewMode, ViewMeta> = {
  city: {
    title: '安徽省市级客户覆盖示意',
    description: '以安徽 16 个地级市作为展示主体，更适合首页快速浏览整体业务分布与重点城市。',
    badge: '市级切换',
    countLabel: '覆盖地市',
    seriesName: '市级客户数',
    geoPath: '/geo/anhui-city.geojson',
    mapName: 'anhui-city-map',
    zoom: 1.08,
    layoutCenter: ['49%', '52%'],
    layoutSize: '104%',
    visualRange: ['#eef4ff', '#c9ddff', '#8fb5ff', '#4f7ddc'],
    labelZoomThreshold: 1.02,
    labelFontSize: 12,
    labelStep: 1,
  },
  county: {
    title: '安徽省县 / 区级覆盖示意',
    description: '红点表示客户所在区域，底图按县区边界展示，用来快速观察覆盖密度与重点区域。',
    badge: '县区切换',
    countLabel: '覆盖县区',
    seriesName: '县区客户数',
    geoPath: '/geo/anhui-county.geojson',
    mapName: 'anhui-county-map',
    zoom: 1.06,
    layoutCenter: ['49%', '52%'],
    layoutSize: '104%',
    visualRange: ['#edf4ff', '#cfdfff', '#9dc0ff', '#5a87df'],
    labelZoomThreshold: 1.46,
    labelFontSize: 11,
    labelStep: 2,
  },
  hefei: {
    title: '合肥市区 / 县客户分布示意',
    description: '聚焦合肥市下辖区县边界，便于观察本地重点覆盖区域与客户分布密度。',
    badge: '合肥视图',
    countLabel: '覆盖区县',
    seriesName: '合肥客户数',
    geoPath: '/geo/hefei-county.geojson',
    mapName: 'hefei-county-map',
    zoom: 1.9,
    layoutCenter: ['50%', '52%'],
    layoutSize: '118%',
    visualRange: ['#eef5ff', '#d4e4ff', '#a6c5ff', '#5f8de4'],
    labelZoomThreshold: 2.18,
    labelFontSize: 12,
    labelStep: 1,
  },
  surrounding: {
    title: '安徽及周边省份业务外延示意',
    description: '用于补足首页视野范围，弱化周边区域细节，同时突出安徽在周边业务网络中的核心位置。',
    badge: '周边视图',
    countLabel: '覆盖省份',
    seriesName: '省级客户数',
    geoPath: '/geo/china-province.geojson',
    mapName: 'china-province-map',
    zoom: 1.4,
    layoutCenter: ['50%', '55%'],
    layoutSize: '140%',
    visualRange: ['#f4f7fb', '#d4def3', '#9ab3e9', '#4f7ddc'],
    labelZoomThreshold: 1.62,
    labelFontSize: 11,
    labelStep: 1,
  },
};

export const AnhuiDistrictMap = ({ mapViews }: AnhuiDistrictMapProps) => {
  const chartRef = useRef<InstanceType<typeof ReactECharts> | null>(null);
  const [mode, setMode] = useState<MapViewMode>(mapViews.defaultMode);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(1);

  const handleModeChange = (nextMode: MapViewMode) => {
    setReady(false);
    setError(false);
    setZoomFactor(1);
    setMode(nextMode);
  };

  useEffect(() => {
    setReady(false);
    setError(false);
    setZoomFactor(1);
    setMode(mapViews.defaultMode);
  }, [mapViews.defaultMode]);

  useEffect(() => {
    let active = true;
    const meta = viewMetaMap[mode];
    setReady(false);
    setError(false);

    const cachedGeo = GEO_CACHE.get(meta.geoPath);
    if (cachedGeo) {
      echarts.registerMap(meta.mapName, cachedGeo as never);
      setReady(true);
      return () => {
        active = false;
      };
    }

    void fetch(meta.geoPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('地图底图加载失败');
        }

        return response.json();
      })
      .then((geojson) => {
        if (!active) {
          return;
        }

        GEO_CACHE.set(meta.geoPath, geojson as GeoFeatureCollection);
        echarts.registerMap(meta.mapName, geojson as never);
        setReady(true);
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      });

    return () => {
      active = false;
    };
  }, [mode]);

  const regions = mapViews[mode];
  const meta = viewMetaMap[mode];
  const layoutCenter = meta.layoutCenter;
  const layoutSize = meta.layoutSize;
  const baseZoom = meta.zoom;

  const handleMapRoam = () => {
    const chart = chartRef.current?.getEchartsInstance();
    const optionState = chart?.getOption() as GeoOptionState | undefined;
    const currentZoom = optionState?.geo?.[0]?.zoom;
    if (typeof currentZoom !== 'number' || !baseZoom) {
      return;
    }

    setZoomFactor((current) => {
      const nextZoomFactor = clampZoomFactor(currentZoom / baseZoom);
      return current === nextZoomFactor ? current : nextZoomFactor;
    });
  };

  const { option, topRegion, totalCustomers, regionCount } = useMemo(() => {
    const regionCount = regions.length;
    const totalCustomers = regions.reduce((sum, item) => sum + item.customerCount, 0);
    const topRegion = [...regions].sort((left, right) => right.customerCount - left.customerCount)[0];

    if (!ready || error || !regionCount) {
      return { option: null, topRegion, totalCustomers, regionCount };
    }

    const visualMax = Math.max(...regions.map((item) => item.customerCount), 1);
    const currentZoom = Number((baseZoom * zoomFactor).toFixed(2));
    const shouldShowAllRegionLabels = currentZoom >= meta.labelZoomThreshold;
    const mapData = regions.map((item) => ({
      name: item.name,
      value: item.customerCount,
    }));
    const dotData = regions.map((item) => ({
      name: item.name,
      value: [item.center[0], item.center[1], item.customerCount],
    }));
    const labelData = regions
      .filter((_, index) => shouldShowAllRegionLabels || index % meta.labelStep === 0)
      .map((item) => ({
        name: item.name,
        coord: item.center,
        value: item.customerCount,
      }));

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(19, 31, 52, 0.96)',
        borderWidth: 0,
        textStyle: { color: '#E8EEF8' },
        formatter: (params: TooltipLikeParams | TooltipLikeParams[]) => {
          const target = Array.isArray(params) ? params[0] : params;
          if (!target) {
            return '';
          }

          if (target.seriesType === 'effectScatter') {
            const count = Array.isArray(target.value) ? target.value[2] ?? 0 : 0;
            return `${target.name}<br/>覆盖点位：${count} 个客户`;
          }

          const count = typeof target.value === 'number' ? target.value : 0;
          return `${target.name}<br/>客户数：${count} 个`;
        },
      },
      visualMap: {
        min: 0,
        max: visualMax,
        show: false,
        inRange: {
          color: meta.visualRange,
        },
      },
      geo: {
        map: meta.mapName,
        roam: true,
        scaleLimit: {
          min: Number((baseZoom * ZOOM_MIN).toFixed(2)),
          max: Number((baseZoom * ZOOM_MAX).toFixed(2)),
        },
        zoom: Number((baseZoom * zoomFactor).toFixed(2)),
        silent: false,
        layoutCenter,
        layoutSize,
        itemStyle: {
          areaColor: '#edf4ff',
          borderColor: 'rgba(38, 58, 94, 0.26)',
          borderWidth: mode === 'hefei' ? 1.2 : mode === 'county' ? 1 : 1.1,
        },
        emphasis: {
          itemStyle: {
            areaColor: '#d8e7ff',
          },
          label: {
            show: false,
          },
        },
      },
      series: [
        {
          name: meta.seriesName,
          type: 'map',
          map: meta.mapName,
          geoIndex: 0,
          data: mapData,
          label: {
            show: false,
          },
          markPoint: {
            symbol: 'circle',
            symbolSize: 1,
            silent: true,
            tooltip: {
              show: false,
            },
            itemStyle: {
              color: 'rgba(0, 0, 0, 0)',
            },
            label: {
              show: true,
              position: 'top',
              distance: 4,
              color: '#42556f',
              fontSize: meta.labelFontSize,
              fontWeight: 600,
              formatter: ({ name }: { name?: string }) => formatRegionLabel(mode, name ?? ''),
            },
            data: labelData,
          },
          emphasis: {
            label: {
              show: true,
              color: '#1f2f49',
              formatter: ({ name }: { name?: string }) => formatRegionLabel(mode, name ?? ''),
            },
          },
          itemStyle: {
            borderColor: 'rgba(38, 58, 94, 0.32)',
          },
          zlevel: 1,
        },
        {
          name: '客户红点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          data: dotData,
          symbolSize: (value: unknown) => {
            const values = Array.isArray(value) ? value : [];
            const count = typeof values[2] === 'number' ? values[2] : 0;
            const base = mode === 'surrounding' ? 9 : mode === 'hefei' ? 7 : 8;
            const factor = mode === 'surrounding' ? 8 : mode === 'hefei' ? 5.5 : 4.5;
            return Math.max(base, Math.min(mode === 'hefei' ? 17 : 20, base + count / factor));
          },
          itemStyle: {
            color: mode === 'surrounding' ? '#e66a6a' : '#d94b5c',
            opacity: mode === 'hefei' ? 0.88 : 0.82,
            borderColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: mode === 'hefei' ? 1.4 : 1.2,
            shadowBlur: mode === 'hefei' ? 10 : 14,
            shadowColor: mode === 'hefei' ? 'rgba(217, 75, 92, 0.22)' : 'rgba(217, 75, 92, 0.28)',
          },
          rippleEffect: {
            brushType: 'stroke',
            scale: mode === 'surrounding' ? 2.8 : mode === 'hefei' ? 2.2 : 2.5,
          },
          emphasis: {
            scale: true,
          },
          zlevel: 2,
        },
      ],
    };

    return { option, topRegion, totalCustomers, regionCount };
  }, [baseZoom, error, layoutCenter, layoutSize, meta, mode, ready, regions, zoomFactor]);

  const chartEvents = {
    georoam: handleMapRoam,
  };

  if (error) {
    return <div className="anhui-map-error">地图底图加载失败，请检查静态资源是否完整。</div>;
  }

  if (!option) {
    return (
      <div className="anhui-map-loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="anhui-map-panel">
      <div className="anhui-map-header">
        <div className="anhui-map-copy">
          <span className="inline-badge">{meta.badge}</span>
          <strong>{meta.title}</strong>
          <p>{meta.description}</p>
        </div>
        <div className="anhui-map-side">
          <div className="anhui-map-metrics">
            <div>
              <small>{meta.countLabel}</small>
              <strong>{regionCount} 个</strong>
            </div>
            <div>
              <small>示例客户</small>
              <strong>{totalCustomers} 个</strong>
            </div>
            <div>
              <small>最密集区域</small>
              <strong>{topRegion ? topRegion.name : '—'}</strong>
            </div>
          </div>
          <div className="anhui-map-toolbar">
            <small className="anhui-map-toolbar-label">展示范围</small>
            <Segmented
              className="anhui-map-switch"
              value={mode}
              onChange={(value) => handleModeChange(value as MapViewMode)}
              options={[
                { label: '合肥市', value: 'hefei' },
                { label: '省内县级', value: 'county' },
                { label: '省内市级', value: 'city' },
                { label: '全国', value: 'surrounding' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="anhui-map-chart">
        <ReactECharts
          ref={chartRef}
          option={option}
          onEvents={chartEvents}
          style={{ width: '100%', height: 'clamp(300px, 50vw, 520px)' }}
        />
      </div>
      <div className="anhui-map-footer">
        <span>支持左键拖动地图，鼠标悬浮在地图区域内可滚轮放大缩小，并可切换合肥市、省内县级、省内市级与全国范围</span>
        <span>{topRegion ? `${topRegion.name} ${topRegion.customerCount} 个客户` : ''}</span>
      </div>
    </div>
  );
};
