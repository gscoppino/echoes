'use strict';

describe('Unit: dropdown directive - ', () => {
	let element, scope, compile, find;
	let dropdownHtml = [
    	'<e-dropdown label="Preset"',
			'items="presets" ',
			'on-select="onPresetChange(item)"',
			'icon="tag"',
		'></e-dropdown>'
	];

	beforeEach(angular.mock.module('core.components'));

	beforeEach(inject(($compile, $rootScope) => {
	    compile = $compile;
	    scope = $rootScope.$new();
	    scope.onPresetChange = (item) => item;
	 	scope.presets = ['All', 'Albums', 'Live'];
	    element = angular.element(dropdownHtml.join(''));
	    $compile(element)(scope);
	    find = (s) => element[0].querySelectorAll(s);
		scope.$digest();
	}));

	it('should render a dropdown element', () => {
	    expect(element.hasClass('btn-group')).toBeTruthy();
	    expect(find('.dropdown-toggle').length).toBe(1);
	});

	it('should render items if given presets', () => {
		expect(find('li').length).toBe(scope.presets.length);
	});

	it('should render a "tag" icon', () => {
		expect(find('i[class*="-tag"]').length).toBe(1);
	});

	it('should render the label according to the "label" attribute', () => {
		expect(find('.dropdown-toggle')[0].innerText.trim()).toBe('Preset');
	});

	it('should call a function when select has changed', () => {
		spyOn(scope, 'onPresetChange');
		element.isolateScope().vm.handleClick([scope.presets[0], 0]);
		expect(scope.onPresetChange).toHaveBeenCalled();
	});

	it('should call a function with the selected item when select has changed', () => {
		spyOn(scope, 'onPresetChange');
		element.isolateScope().vm.handleClick([scope.presets[0], 0]);
		expect(scope.onPresetChange).toHaveBeenCalledWith([scope.presets[0], 0]);
	});

	it('should set the selected item as active', () => {
		let index = 1;
		element.isolateScope().vm.handleClick(scope.presets[index], index);
		scope.$digest();
		expect(element.find('li').eq(index).hasClass('active')).toBeTruthy();
	});

	it('should set a predefined selected index from attribute', () => {
		let dropdownWithSelectedIndex = dropdownHtml.concat();
		dropdownWithSelectedIndex.splice(1, 0, ' selected="1" ');
		element = angular.element(dropdownWithSelectedIndex.join(''));
	    compile(element)(scope);
		scope.$digest();
		expect(element.find('li').eq(1).hasClass('active')).toBeTruthy();
	});
});