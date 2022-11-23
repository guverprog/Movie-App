import './MovieHeader.css';
import { Tabs } from 'antd';

function MovieHeader({ onFilterChange }) {
  return (
    <header className="header">
      <Tabs
        defaultActiveKey="1"
        centered
        size="large"
        onChange={onFilterChange}
        items={[
          {
            label: 'Search',
            key: 'search',
          },
          {
            label: 'Rated',
            key: 'rated',
          },
        ]}
      />
    </header>
  );
}
export default MovieHeader;
