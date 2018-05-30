'use strict';

const getTemplateFileFromObj =
  require('../../../app/ejs-renderer/getTemplateFileFromObj');

describe('app module ->', () => {
  describe('could getTemplateFileFromObj()', () => {
    it('if shallow _templateFile available', () => {
      const input = {
        _templateFile: 'abc',
        data: 'some data',
      };

      const output = getTemplateFileFromObj(input);

      expect(output).toBe('abc');
    });

    it('if deep _templateFile available', () => {
      const input = {
        someArray: [
          {
            id: 123,
            _templateFile: 'should not be this one',
          },
        ],
        emptyObj: {},
        key: {
          deeper: {
            _templateFile: 'abc',
            id: 2,
          },
          private: true,
        },
      };

      const output = getTemplateFileFromObj(input);

      expect(output).toBe('abc');
    });

    it('if no _templateFile available', () => {
      const input = {
        a: 'abc',
        data: 'some data',
      };

      const output = getTemplateFileFromObj(input);

      expect(output).toBeUndefined();
    });
  });
});
