import UsageList from 'renderer/components/UsageList';
import UsageOverview from 'renderer/components/UsageOverview';
import './index.scss';

const Index = () => {
  return (
    <div className="home">
      <UsageOverview />
      <UsageList />
    </div>
  );
};

export default Index;
