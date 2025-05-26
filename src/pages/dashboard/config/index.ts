import workersLogo from '@/assets/images/icon-workers.png';
import gpusLogo from '@/assets/images/icon-gpus.png';
import modelLogo from '@/assets/images/icon-model.png';
import copyLogo from '@/assets/images/icon-copy.png';

export const overviewConfigs = [
  {
    key: 'worker_count',
    label: 'dashboard.workers',
    backgroundColor: 'var(--color-white-1)',
    desc: 'dashboard.workers.desc',
    logoUrl: workersLogo
  },
  {
    key: 'gpu_count',
    label: 'dashboard.totalgpus',
    backgroundColor: 'var(--color-white-1)',
    desc: 'dashboard.totalgpus.desc',
    logoUrl: gpusLogo
  },

  {
    key: 'model_count',
    label: 'dashboard.models',
    backgroundColor: 'var(--color-white-1)',
    desc: 'dashboard.models.desc',
    logoUrl: modelLogo
  },
  {
    key: 'model_instance_count',
    label: 'models.form.replicas',
    backgroundColor: 'var(--color-white-1)',
    desc: 'models.form.replicas.desc',
    logoUrl: copyLogo
  }
];
