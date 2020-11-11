import axios from 'axios';
import moment from 'moment';
import { Moment } from 'moment';
import React from 'react';
import styled from 'styled-components';
import { counting, mapData, Record, Response, sort } from './ulti';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  color: #fff;
  background-color: ${(p: Record) => {
    if (!counting.includes(p.state) && p.winner) {
      return p.winner === 'R' ? '#ff0000' : '#0000ff';
    }
    return p.leader === 'R' ? '#ff0000aa' : '#0000ffaa';
  }};
`;

const Td = styled.td`
  padding: 8px;
  border-top: #aaa solid 1px;
  border-bottom: #aaa solid 1px;
  border-left: 0;
  border-right: 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-top: #aaa solid 1px;
  border-bottom: #aaa solid 1px;
  border-left: 0;
  border-right: 0;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  padding: 0 8px;
`;

const Divider = styled.div`
  width: 100%auto;
  height: 1em;
`;

type S = {
  data: Record[];
  totalVotes: number;
  trump: number;
  biden: number;
  publicationDate?: Moment;
  lastModifiedDate?: Moment;
};

export class App extends React.Component<{}, S> {
  state: S = { data: [], trump: 0, biden: 0, totalVotes: 0 };

  componentDidMount() {
    this.fetch();
    window.setInterval(() => {
      this.fetch();
    }, 60 * 1000);
  }

  fetch = async () => {
    const res = await axios.get<Response>(
      `https://cf-particle-html.eip.telegraph.co.uk/data-source/29a8fa47-22e1-4ee1-94c1-ce7d57db1c9b.json?date=${new Date().toString()}`,
    );
    const data = sort(mapData(res.data));
    let total = 0;
    let trump = 0;
    let biden = 0;
    data.forEach((el) => {
      total += el.electoral;
      if (!counting.includes(el.state)) {
        if (el.winner === 'R') {
          trump += el.electoral;
        }
        if (el.winner === 'D') {
          biden += el.electoral;
        }
      }
    });

    this.setState({
      data,
      trump,
      biden,
      totalVotes: total,
      publicationDate: moment(Math.floor(res.data.publication_date)),
      lastModifiedDate: moment(Math.floor(res.data.last_modified_date)),
    });
  };

  render() {
    return (
      <>
        <FlexBox>
          <Row>
            Publication date: <strong>{this.state.publicationDate?.toString()}</strong>
          </Row>
          <Row>
            Last modified date: <strong>{this.state.lastModifiedDate?.toString()}</strong>
          </Row>
          <Row>
            Source: <strong>telegraph.co.uk</strong>
          </Row>
          <Row>
            Edited by: <strong>Linh Nguyễn</strong>
          </Row>
          <Row>
            Facebook:{' '}
            <a href="https://facebook.com/nhlinhcs">
              <strong>Linh Nguyễn</strong>
            </a>
          </Row>
        </FlexBox>
        <Divider />
        <Row>
          <span>Total: </span>
          <strong>{this.state.totalVotes}</strong>
        </Row>
        <Row>
          <span>Called: </span>
          <strong>{this.state.trump + this.state.biden}</strong>
        </Row>
        <Row>
          <span>Trump: </span>
          <strong>{this.state.trump}</strong>
        </Row>
        <Row>
          <span>Biden: </span>
          <strong>{this.state.biden}</strong>
        </Row>

        <Divider />

        <Table>
          <thead>
            <tr>
              <Th>State code</Th>
              <Th>State name</Th>
              <Th>Electoral college seats</Th>
              <Th>Biden</Th>
              <Th>Trump</Th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <Tr key={item.state} {...item}>
                <Td>{item.state}</Td>
                <Td>{item.stateName}</Td>
                <Td>{item.electoral}</Td>
                <Td>
                  {item.bidenVotes} ({item.bidenShare}%)
                </Td>
                <Td>
                  {item.trumpVotes} ({item.trumpShare}%)
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
