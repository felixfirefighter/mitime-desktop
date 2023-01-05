import UsageBarChart from 'renderer/components/UsageBarChart';
import UsageList from 'renderer/components/UsageList';
import UsageOverview from 'renderer/components/UsageOverview';
import styles from './index.module.scss';

const Index = () => {
  return (
    <div>
      <UsageOverview />
      <UsageBarChart />
      <UsageList />
    </div>
  );
};

export default Index;
