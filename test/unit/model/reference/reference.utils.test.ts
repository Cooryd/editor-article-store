import { createReferencePersonList, createReferenceAnnotatedValue, deserializeReferenceAnnotatedValue } from '../../../../src/model/reference/reference.utils';
import { parseXML } from '../../../../src/xml-exporter/xml-utils';

describe('createReferencePersonList', () => {
  it('returns empty xml if no persongroup xml is present', () => {
    const element = parseXML('<article></article>')
    expect(createReferencePersonList(element.querySelector('article') as Element, 'someGroupType')).toEqual([]);
  });
  it('returns empty xml if no persongroup with passed groupType is present', () => {
    const element = parseXML(`
    <article>
      <person-group person-group-type="author"><name>
        <surname>Katz</surname>
        <given-names>DJ</given-names>
      </name></person-group>
    </article>`)
    expect(createReferencePersonList(element.querySelector('article') as Element, 'someGroupType')).toEqual([]);
  });
  it('returns expected array of objects when passed persongroup xml', () => {
    const element = parseXML(`
    <article>
      <person-group person-group-type="author">
      <name>
        <surname>Katz</surname>
        <given-names>DJ</given-names>
      </name>
      <name>
        <surname>Bloggs</surname>
      </name>
      <name>
        <given-names>Joe</given-names>
      </name>
      <some-other-element>
        I'm some text content
      </some-other-element>
      <self-closing-element />
    </person-group>
    </article>`);
    expect(createReferencePersonList(element.querySelector('article') as Element, 'author')).toEqual([
      {
        firstName: 'DJ',
        lastName: 'Katz'
      },
      {
        firstName: '',
        lastName: 'Bloggs'
      },
      {
        firstName: 'Joe',
        lastName: ''
      },
      {
        groupName: "I'm some text content"
      },
      {
        groupName: ""
      }
    ]);
  });
});

describe('createReferenceAnnotatedValue', () => {
  it('returns empty EditorState when passed no Element', () => {
    expect(createReferenceAnnotatedValue()).toMatchInlineSnapshot(`
    Object {
      "doc": Object {
        "type": "annotatedReferenceInfoDoc",
      },
      "selection": Object {
        "anchor": 0,
        "head": 0,
        "type": "text",
      },
    }
    `);
  });
  it('returns populated EditorState when passed Element', () => {
    const element = parseXML(`
    <article><p>
    I <bold>am</bold><italic>some</italic><sub>styled</sub><sup>HTML</sup>
    </p></article>`);
    expect(createReferenceAnnotatedValue(element.querySelector('p'))).toMatchInlineSnapshot(`
    Object {
      "doc": Object {
        "content": Array [
          Object {
            "text": "I ",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "bold",
              },
            ],
            "text": "am",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "italic",
              },
            ],
            "text": "some",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "subscript",
              },
            ],
            "text": "styled",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "superscript",
              },
            ],
            "text": "HTML",
            "type": "text",
          },
        ],
        "type": "annotatedReferenceInfoDoc",
      },
      "selection": Object {
        "anchor": 0,
        "head": 0,
        "type": "text",
      },
    }
    `);
  });
});

describe('deserializeReferenceAnnotatedValue', () => {
  expect(deserializeReferenceAnnotatedValue({
    "doc": {
      "content": [
        {
          "text": "I ",
          "type": "text",
        },
        {
          "marks": [
            {
              "type": "bold",
            },
          ],
          "text": "am",
          "type": "text",
        },
        {
          "marks": [
            {
              "type": "italic",
            },
          ],
          "text": "some",
          "type": "text",
        },
        {
          "marks": [
            {
              "type": "subscript",
            },
          ],
          "text": "styled",
          "type": "text",
        },
        {
          "marks": [
            {
              "type": "superscript",
            },
          ],
          "text": "HTML",
          "type": "text",
        },
      ],
      "type": "annotatedReferenceInfoDoc",
    },
    "selection": {
      "anchor": 0,
      "head": 0,
      "type": "text",
    },
  })).toMatchInlineSnapshot(`
    Object {
      "doc": Object {
        "content": Array [
          Object {
            "text": "I ",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "bold",
              },
            ],
            "text": "am",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "italic",
              },
            ],
            "text": "some",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "subscript",
              },
            ],
            "text": "styled",
            "type": "text",
          },
          Object {
            "marks": Array [
              Object {
                "type": "superscript",
              },
            ],
            "text": "HTML",
            "type": "text",
          },
        ],
        "type": "annotatedReferenceInfoDoc",
      },
      "selection": Object {
        "anchor": 0,
        "head": 0,
        "type": "text",
      },
    }
    `);
});