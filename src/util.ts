import * as fs from 'fs';

const hasDockerEnv = () => {
  try {
    fs.statSync('/.dockerenv');
    return true;
  } catch {
    return false;
  }
};

const hasDockerCGroup = () => {
  try {
    return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
  } catch {
    return false;
  }
};

export default () => {
  return hasDockerEnv() || hasDockerCGroup();
};
