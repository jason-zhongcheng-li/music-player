import { FC } from 'react';
import logo from '../../assets/logo.svg';

interface LoadingProps {
  enabled: boolean;
}

const Loading: FC<LoadingProps> = ({ enabled }: LoadingProps) => {
  return enabled ? <img src={logo} className="App-logo" alt="logo" /> : null;
};

export default Loading;
