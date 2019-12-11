
class Dao {
  constructor() {
  }



  async bulkCeate(iterable, transaction) {
    return await Promise.all(iterable.map(async item => {
      const res = await this.create(item, { transaction })
      return res;
    }))
  }

  async create(item, transaction) {
    const res = await this.mapper.create(item, transaction)
    return res.dataValues
  }

  async findAll(condition) {
    return await this.mapper.findAll(
      condition
    ).map(el => {
      return el.get({ plain: true })
    })
  }
}

module.exports = Dao