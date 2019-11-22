import { model } from 'mongoose'
class Service {
  constructor(instance) {
    this.model = instance
    this.modelName = instance.modelName

    this.createService()
  }

  static create(instance) {
    return new Service(instance)
  }

  createService() {
    this.create = async data => this.model.create(data)

    this.createMany = async data => this.model.insertMany(data)

    this.get = async (value, field, callback) => this.model.findOne(value, field, callback)

    this.remove = async (value, callback) => this.model.deleteMany(value, callback)

    this.getById = async (value, field, callback) => this.model.findById(value, field, callback)

    this.getByIdLean = async (value, field, callback) =>
      this.model.findById(value, field, callback).lean()

    this.getByIdLean = async (value, field, callback) =>
      this.model.findById(value, field, callback).lean()

    this.getLean = async (value, field, callback) =>
      this.model.findOne(value, field, callback).lean()

    this.getMany = async (value, field, callback) => this.model.find(value, field, callback)

    this.getManyLean = async (value, field, callback) =>
      this.model.find(value, field, callback).lean()

    this.getAll = async () => this.model.collection

    this.agg = (value, callback) => this.model.aggregate(value, callback)

    this.aggPaginate = async (aggregate, options) =>
      this.model.aggregatePaginate(aggregate, options)

    this.paginate = async (aggregate, options) => this.model.paginate(aggregate, options)

    this.getRaw = value => this.model.findOne(value, (err, raw) => raw)

    this.getManyRaw = value => this.model.find(value, (err, raw) => raw)

    this.update = async (value, data, field) => this.model.updateOne(value, data, field)

    this.ensureIndex = async value => this.model.ensureIndex(value)

    this.delete = async (value, field) => this.model.deleteOne(value, field)

    this.deleteMany = async (value, field) => this.model.deleteMany(value, field)

    this.count = async () => this.model.countDocuments({})
  }
}

export const createService = (name, scheme) => {
  const createdModel = model(name, scheme)

  return new Service(createdModel)
}
