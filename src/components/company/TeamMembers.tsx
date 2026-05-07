import { Avatar, Col, Row, Tag } from 'antd';
import { teamMembers } from '../../mocks/company.mock';

export const TeamMembers = () => {
  return (
    <Row gutter={[18, 18]}>
      {teamMembers.map((member) => (
        <Col xs={24} md={12} key={member.name}>
          <article className="member-card">
            <div className="member-head">
              <Avatar size={56}>{member.name.slice(0, 1)}</Avatar>
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
              <em className="member-seq">核心序列</em>
            </div>
            <p>{member.description}</p>
            <div className="member-tags">
              {member.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        </Col>
      ))}
    </Row>
  );
};
