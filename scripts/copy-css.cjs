const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const distTokens = path.join(dist, 'tokens')
const distComponents = path.join(dist, 'components')

;[dist, distTokens, distComponents].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
})

fs.copyFileSync(
  path.join(root, 'src', 'tokens', 'theme.css'),
  path.join(distTokens, 'theme.css')
)
fs.copyFileSync(
  path.join(root, 'src', 'components', 'components.css'),
  path.join(distComponents, 'components.css')
)

console.log('CSS copied to dist/')
