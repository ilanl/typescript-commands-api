import { HeroRepository, IHeroModel } from '../src/devices/dao/HeroDao';
import { setupDB } from "./setup/db"

setupDB(process.env.DB_URL)

describe("Save Hero", () => {
  it("Create Hero and Save", async () => {
    
    const heroDao = new HeroRepository()
    let hero = <IHeroModel>{
      name: 'name',
      power: 'power',
      amountPeopleSaved: 0
    };
    let h = await heroDao.create(hero)
    expect(h.name).toEqual('name')
  });
});