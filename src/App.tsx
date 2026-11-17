import { MotionConfig } from 'motion/react';
import Tutorial from './pages/Tutorial';

// reducedMotion="user": animations are toned down for people who set "reduce motion" on their device
const App = () => (
  <MotionConfig reducedMotion="user">
    <Tutorial />
  </MotionConfig>
);

export default App;
