
class Dao {
  constructor() {
  }



  async bulkCeate(iterable, transaction) {
    return await Promise.all(iterable.map(async item => {
      const res = await this.create(item, { transaction })
      return res;
    }))
  }

  async create(payload, transaction) {
    const res = await this.mapper.create(payload, transaction)
    return res.dataValues
  }

  /**
   * 
   * @param {Object} condition { where: { id: 2 }, include: [{ model: user }] }
   * @return {Array} [{id: 2, name: 233, model: [{ id:1 }]}, {}]
   */
  async findAll(condition) {
    return await this.mapper.findAll(
      condition
    ).map(el => {
      return el.get({ plain: true })
    })
  }
}

module.exports = Dao