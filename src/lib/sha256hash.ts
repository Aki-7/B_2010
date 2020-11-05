import crypto from 'crypto'
import { SECRET } from '../config/variables'

export const getHashSha25 = (target: string) => {
  const sha = crypto.createHmac('sha256', SECRET)
  sha.update(target)
  return sha.digest('hex')
}
