import { Tag } from 'kens-design-system';

export const StackTags = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Tag>HTML</Tag>
    <Tag>CSS</Tag>
    <Tag>JS</Tag>
  </div>
);

export const Single = () => <Tag>React</Tag>;
