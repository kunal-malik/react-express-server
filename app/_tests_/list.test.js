import React from 'react';
import ReactDOM from 'react-dom';
import List from '../components/list'
import { shallow, mount } from 'enzyme';
import Constants from '../constants'

describe('List component ', () => {
    let handleBranchChanges = jest.fn()
    const fitMachinesData = [
        {
            "name": "fitMachine_1",
            "value": "1.1"
        },
        {
            "name": "fitMachine_2",
            "value": "1.0"
        }
    ]

    const sortedFitMachinesData = [
        {
            "name": "fitMachine_2",
            "value": "1.0"
        },
        {
            "name": "fitMachine_1",
            "value": "1.1"
        }
    ]

    it('renders without crashing', () => {
     shallow(<List/>);
    });

    it('calls api after mounting', () => {
        spyOn(List.prototype,'getFitMachinesList').and.callThrough()
        const wrapper =  mount(<List/>);
        expect(List.prototype.getFitMachinesList).toHaveBeenCalled()
    })

    it('sorts data on click of the button', () => {
        spyOn(List.prototype,'sortByValue').and.callThrough()
        const wrapper =  mount(<List/>);
        wrapper.setState({fitMachinesData: fitMachinesData})
        const button = wrapper.find('[id="button-sort-by-value"]')
        button.simulate('click')
        expect(List.prototype.sortByValue).toHaveBeenCalled()
        expect(wrapper.state().sortedType).toBe(Constants.DESCENDING)
        expect(wrapper.state().fitMachinesData).toBe(fitMachinesData)
        button.simulate('click')
        expect(wrapper.state().sortedType).toBe(Constants.ASCENDING)
        expect(wrapper.state().fitMachinesData).toEqual(sortedFitMachinesData)
    })
});

