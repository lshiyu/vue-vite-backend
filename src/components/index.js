import Pagination from './Pagination'
import Editor from './Editor'
import XrForm from './XrForm'
export const setupGlobComponents = app => {
  app.component('Pagination', Pagination)
  app.component('Editor', Editor)
  app.component('XrForm', XrForm)
}
