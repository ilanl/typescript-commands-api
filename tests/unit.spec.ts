import { Dependency } from '../src/use_case/dep_interface'
import { Simple } from '../src/use_case/simple'
import { mock } from 'jest-mock-extended';

describe("Simple Unit", () => {
  it("Check Simple", async () => {
    
    const dependencyMock = mock<Dependency>();
    dependencyMock.getPrefix.mockReturnValue('A');
    dependencyMock.check.mockImplementation(() => {
      throw new Error();
    });
    
    let simple = new Simple(dependencyMock);
    let result = simple.makeSimple();

    expect(dependencyMock.getPrefix).toHaveBeenCalledWith(true)
    expect(result).toEqual("Found A");
  });
});