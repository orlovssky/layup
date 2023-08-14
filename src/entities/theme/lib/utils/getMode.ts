import MODE from '../constants/MODE'

export default () => {
  return document.documentElement.dataset.theme as MODE
}
