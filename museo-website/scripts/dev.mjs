import { spawn } from 'node:child_process'

const isWindows = process.platform === 'win32'

const run = (command, args) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: isWindows,
  })

  return child
}

const vite = run('npm', ['run', 'dev:web'])
const api = run('npm', ['run', 'dev:api'])

const shutdown = () => {
  vite.kill('SIGTERM')
  api.kill('SIGTERM')
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

vite.on('exit', () => {
  shutdown()
  process.exit(0)
})

api.on('exit', () => {
  shutdown()
  process.exit(0)
})
