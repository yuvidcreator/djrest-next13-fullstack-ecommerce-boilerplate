const argEnvIndex = process.argv.indexOf('--env')
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || ''

const RUN_ENV_MAP = {
  local: {
    instances: 1,
    max_memory_restart: '128M'
  },
  dev: {
    instances: 1,
    max_memory_restart: '256M'
  },
  prod: {
    instances: 1,
    max_memory_restart: '512M'
  }
}

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = 'prod'
}

module.exports = {
  apps: [
    {
      name: 'innerkomfort-production-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4001',
      instances: RUN_ENV_MAP[argEnv].instances,
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
      env_local: {
        APP_ENV: 'local'
      },
      env_dev: {
        APP_ENV: 'dev'
      },
      env_prod: {
        APP_ENV: 'prod'
      }
    }
  ]
}