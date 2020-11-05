import factory from 'factory-girl'
import { BaseEntity } from 'typeorm'

class TypeormActiveRecordAdapter {
  build(Model: typeof BaseEntity, props: { [key: string]: unknown }) {
    return Model.create(props)
  }
  async save(model: BaseEntity) {
    return await model.save()
  }
  async destroy(model: BaseEntity) {
    return await model.remove()
  }
  get(model: BaseEntity & { [key: string]: unknown }, attr: string) {
    return model[attr]
  }
  set(props: { [key: string]: unknown }, model: BaseEntity) {
    return Object.assign(model, props)
  }
}

factory.setAdapter(new TypeormActiveRecordAdapter())

class ApplicationFactory<T> {
  constructor(private name: string) {}

  readonly build = async (): Promise<T> => {
    return await factory.build(this.name)
  }

  readonly create = async (): Promise<T> => {
    return await factory.create(this.name)
  }

  readonly define = <T>(
    Model: typeof BaseEntity,
    attrs: factory.Attributes<T>,
    options?: factory.Options<T>
  ) => {
    factory.define(this.name, Model, attrs, options)
    return this
  }
}

export default ApplicationFactory
