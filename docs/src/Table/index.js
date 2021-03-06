import classNames from "classnames";
import GeminiScrollbar from "react-gemini-scrollbar";
import React from "react";

import CodeBlock from "../components/CodeBlock";
import ComponentExample from "../components/ComponentExample";
import ComponentExampleWrapper from "../components/ComponentExampleWrapper";
import ComponentWrapper from "../components/ComponentWrapper";
import PropertiesAPIBlock from "../components/PropertiesAPIBlock";
import Table from "../../../src/Table/Table.js";

function compareValues(a, b) {
  if (b == null || a > b) {
    return 1;
  } else if (a == null || a < b) {
    return -1;
  } else {
    return 0;
  }
}

function getSortFunction(tieBreaker) {
  return function(prop) {
    return function(a, b) {
      if (a[prop] === b[prop]) {
        return compareValues(a[tieBreaker], b[tieBreaker]);
      }

      return compareValues(a[prop], b[prop]);
    };
  };
}

const rows = [
  { name: "Zach", age: 11, gender: "Male", location: "SF, CA", id: "a" },
  {
    name: "Franco",
    age: 34,
    gender: "Female",
    location: "Boston, MA",
    id: "b"
  },
  { name: "Sandy", age: 68, gender: "Female", location: "Roy, MI", id: "c" },
  { name: "Jeffrey", age: 21, gender: "Male", id: "d" },
  { name: "Louise", age: 94, gender: "Female", location: "Yolo, CO", id: "e" },
  { name: "Nancy", age: 28, gender: "Female", location: "Mory, UT", id: "f" },
  { name: "Anna", age: 63, gender: "Female", location: "Vegas, NV", id: "g" },
  { name: "Jay", age: 35, gender: "Male", location: "Washington, DC", id: "h" },
  { name: "Bob", age: 47, gender: "Male", location: "New Oleans, LA", id: "i" },
  { name: "Nick", age: 51, gender: "Male", location: "Houston, TX", id: "j" }
];

class TableExample extends React.Component {
  constructor() {
    super(...arguments);

    // Cache huge rows so we don't recreate the data every update.
    this.hugeRows = this.getManyRows();
  }

  componentDidMount() {
    this.forceUpdate();
  }

  getColumnHeading(prop, order, sortBy) {
    const caretClassNames = classNames({
      caret: true,
      "caret--asc": order === "asc",
      "caret--desc": order === "desc",
      "caret--visible": sortBy.prop === prop
    });

    const headingStrings = {
      age: "Age",
      gender: "Gender",
      location: "Location",
      name: "Name"
    };

    return (
      <span>
        {headingStrings[prop]}
        <span className={caretClassNames} />
      </span>
    );
  }

  getColGroup() {
    return (
      <colgroup>
        <col style={{ width: "40%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>
    );
  }

  getColumns() {
    return [
      {
        className: "name",
        heading: this.getColumnHeading,
        prop: "name",
        sortable: true
        // Using default sorting.
        // Uncomment this to use age as tie breaker for name
        // sortFunction: getSortFunction('age')
      },
      {
        cacheCell: true,
        className: "age",
        heading: this.getColumnHeading,
        prop: "age",
        sortable: true,
        sortFunction: getSortFunction("name")
      },
      {
        cacheCell: true,
        className: "location",
        defaultContent: "None Specified",
        heading: this.getColumnHeading,
        prop: "location",
        sortable: true,
        sortFunction: getSortFunction("name")
      },
      {
        cacheCell: true,
        className: "gender",
        heading: this.getColumnHeading,
        prop: "gender",
        sortable: true,
        sortFunction: getSortFunction("name")
      }
    ];
  }

  getRows() {
    return rows.slice(0);
  }

  getManyRows() {
    const oldRows = rows.slice(0);
    const newRows = [];
    for (var i = 0; i < 10000; i++) {
      const item = oldRows[Math.floor(Math.random() * oldRows.length)];
      newRows.push({
        name: item.name,
        age: item.age,
        gender: item.gender,
        location: item.location,
        id: i
      });
    }

    return newRows;
  }

  render() {
    return (
      <ComponentWrapper
        title="Table"
        srcURI="https://github.com/mesosphere/reactjs-components/blob/master/src/Table/Table.js"
      >
        <p className="lead flush-bottom">
          Display data in a structured way. Handles extremely large amounts of
          data and only displays the rows needed (?? la infinite scroll).
        </p>
        <PropertiesAPIBlock
          propTypesBlock={"PROPTYPES_BLOCK(src/Table/Table.js)"}
        />
        <ComponentExampleWrapper>
          <ComponentExample>
            <h3>A Close Look At Table Columns</h3>
            <p>
              Columns are an important piece of this component. The following
              columns are used for all of the example Tables on this page.
            </p>
          </ComponentExample>
          <CodeBlock>
            {`getColumns() {
  // We want to pass an array of objects.
  // Each object should contain information about the settings for that column.
  return [
    // The first column will be a "name" column.
    {
      className: 'name',
      heading: this.getColumnHeading,
      prop: 'name',
      sortable: true

      // Using default sorting function.
      // Uncomment this to use age as tie breaker for name
      // sortFunction: getSortFunction('age')
    },
    {
      cacheCell: true,
      className: 'age',
      heading: this.getColumnHeading,
      prop: 'age',
      sortable: true,
      sortFunction: getSortFunction('name')
    },
    {
      cacheCell: true,
      className: 'location',
      defaultContent: 'None Specified',
      heading: this.getColumnHeading,
      prop: 'location',
      sortable: true,
      sortFunction: getSortFunction('name')
    },
    {
      cacheCell: true,
      className: 'gender',
      heading: this.getColumnHeading,
      prop: 'gender',
      sortable: true,
      sortFunction: getSortFunction('name')
    }
  ];
}

<Table
  //...
  columns={this.getColumns()} />

`}
          </CodeBlock>
        </ComponentExampleWrapper>
        <ComponentExampleWrapper>
          <ComponentExample>
            <Table
              className="table flush-bottom"
              colGroup={this.getColGroup()}
              columns={this.getColumns()}
              data={this.getRows("large")}
            />
          </ComponentExample>
          <CodeBlock>
            {`import {Table} from 'reactjs-components';
import React from 'react';

function compareValues(a, b) {
  if (b == null || a > b) {
    return 1;
  } else if (a == null || a < b) {
    return -1;
  } else {
    return 0;
  }
}

function getSortFunction(tieBreaker) {
  return function (prop) {
    return function (a, b) {
      if (a[prop] === b[prop]) {
        return compareValues(a[tieBreaker], b[tieBreaker]);
      }

      return compareValues(a[prop], b[prop]);
    };
  };
}

let rows = [
  {
    name: 'Zach',
    age: 11,
    gender: 'Male',
    location: 'San Francisco, CA',
    id: 'a'
  },
  {
    name: 'Francis',
    age: 34,
    gender: 'Female',
    location: 'Boston, MA',
    id: 'b'
  },
  //...
];

class TableExample extends React.Component {
  getColGroup() {
    return (
      <colgroup>
        <col style={{width: '40%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '20%'}} />
      </colgroup>
    );
  }

  getColumns() {
    return [
      {
        className: 'name',
        heading: this.getColumnHeading,
        prop: 'name',
        sortable: true
        // Using default sorting.
        // Uncomment this to use age as tie breaker for name
        // sortFunction: getSortFunction('age')
      },
      {
        className: 'age',
        heading: this.getColumnHeading,
        prop: 'age',
        sortable: true,
        sortFunction: getSortFunction('name')
      },
      {
        className: 'location',
        defaultContent: 'None Specified',
        heading: this.getColumnHeading,
        prop: 'location',
        sortable: true,
        sortFunction: getSortFunction('name')
      },
      {
        className: 'gender',
        heading: this.getColumnHeading,
        prop: 'gender',
        sortable: true,
        sortFunction: getSortFunction('name')
      }
    ];
  }

  getRows() {
    return rows.slice(0);
  }

  render() {
    return (
      <Table
        className="table"
        colGroup={this.getColGroup()}
        columns={this.getColumns()}
        data={this.getRows()} />
    );
  }
}`}
          </CodeBlock>
        </ComponentExampleWrapper>

        <ComponentExampleWrapper>
          <ComponentExample>
            <div className="row row-flex">
              <div className="column-12">
                <h4 className="flush-top">Infinite Scroll</h4>
                <p>
                  Here is a scroll table with 10k items. Use the
                  "containerSelector" property to indicate the parent element
                  with a scrollbar in order to listen to its scroll event. The
                  data is not sorted by default.
                </p>
              </div>
            </div>
            <GeminiScrollbar
              autoshow={true}
              className="container-scrollable"
              style={{ height: 800 }}
            >
              <Table
                className="table"
                colGroup={this.getColGroup()}
                columns={this.getColumns()}
                data={this.hugeRows}
                containerSelector=".gm-scroll-view"
              />
            </GeminiScrollbar>
          </ComponentExample>
          <CodeBlock>
            {`import {Table} from 'reactjs-components';
import React from 'react';

function compareValues(a, b) {
  if (b == null || a > b) {
    return 1;
  } else if (a == null || a < b) {
    return -1;
  } else {
    return 0;
  }
}

function getSortFunction(tieBreaker) {
  return function (prop) {
    return function (a, b) {
      if (a[prop] === b[prop]) {
        return compareValues(a[tieBreaker], b[tieBreaker]);
      }

      return compareValues(a[prop], b[prop]);
    };
  };
}

let rows = [
  {
    name: 'Zach',
    age: 11,
    gender: 'Male',
    location: 'San Francisco, CA',
    id: 'a'
  },
  {
    name: 'Francis',
    age: 34,
    gender: 'Female',
    location: 'Boston, MA',
    id: 'b'
  },
  //...
];

class InfiniteScrollExample extends React.Component {
  constructor() {
    super();
    // Cache huge rows so we don't recreate the data every update.
    this.hugeRows = this.getManyRows();
  }

  getColGroup() {
    return (
      <colgroup>
        <col style={{width: '40%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '20%'}} />
      </colgroup>
    );
  }

  getColumns() {
    return [
      {
        className: 'name',
        heading: this.getColumnHeading,
        prop: 'name',
        sortable: true
        // Using default sorting.
        // Uncomment this to use age as tie breaker for name
        // sortFunction: getSortFunction('age')
      },
      {
        className: 'age',
        heading: this.getColumnHeading,
        prop: 'age',
        sortable: true,
        sortFunction: getSortFunction('name')
      },
      {
        className: 'location',
        defaultContent: 'None Specified',
        heading: this.getColumnHeading,
        prop: 'location',
        sortable: true,
        sortFunction: getSortFunction('name')
      },
      {
        className: 'gender',
        heading: this.getColumnHeading,
        prop: 'gender',
        sortable: true,
        sortFunction: getSortFunction('name')
      }
    ];
  }

  getManyRows() {
    let oldRows = rows.slice(0);
    let newRows = [];
    for (var i = 0; i < 10000; i++) {
      let item = oldRows[Math.floor(Math.random() * oldRows.length)];
      newRows.push({
        name: item.name,
        age: item.age,
        gender: item.gender,
        location: item.location,
        id: i
      });
    }

    return newRows;
  }

  render() {
    return (
      <div class="container">
        <Table
          className="table"
          colGroup={this.getColGroup()}
          columns={this.getColumns()}
          containerSelector=".container"
          data={this.hugeRows} />
      </div>
    );
  }
}`}
          </CodeBlock>
        </ComponentExampleWrapper>
      </ComponentWrapper>
    );
  }
}

module.exports = TableExample;
