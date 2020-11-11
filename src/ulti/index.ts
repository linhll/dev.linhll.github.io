export type Party = 'R' | 'D';

export interface Response {
  publication_date: number;
  last_modified_date: number;
  stateData: { statecode: string }[];
  scrapedData: {
    state: string;
    winner?: Party;
    leader?: Party;
    reporting?: string;
    isrunoff?: 'TRUE' | 'FALSE';
    totalvotes: string;
    trumpvotes: string;
    bidenvotes: string;
    bidenshare: string;
    trumpshare: string;
  }[];
  resultsData: {
    statecode: string;
    statelongname: string;
    electoralcollegeseats: string;
    manualinputwinner: 'biden' | 'trump';
    bidenpercentagescraped: string;
    trumppercentagescraped: string;
    bidenpopularvotescraped: string;
    trumppopularvotescraped: string;
  }[];
}

export interface Record {
  state: string;
  stateName: string;
  electoral: number;
  winner?: Party;
  leader?: Party;
  isRunOff?: boolean;
  trumpVotes: number;
  bidenVotes: number;
  bidenShare: number;
  trumpShare: number;
}

export function sort(data: Record[]) {
  return data.sort((a, b) => {
    if (a.isRunOff) {
      if (b.isRunOff) {
        return a.state.localeCompare(b.state);
      }
      return 1;
    }
    if (b.isRunOff) {
      return -1;
    }
    return a.state.localeCompare(b.state);
  });
}

export function mapData(data: Response) {
  return data.resultsData
    .map((rs) => {
      const isCounting = counting.includes(rs.statecode);
      const trumpVotes = +rs.trumppopularvotescraped;
      const bidenVotes = +rs.bidenpopularvotescraped;
      let leader: Party | undefined;
      if (!isCounting) {
        if (rs.manualinputwinner) {
          leader = rs.manualinputwinner === 'trump' ? 'R' : 'D';
        } else {
          leader = trumpVotes > bidenVotes ? 'R' : 'D';
        }
      } else {
        leader = trumpVotes > bidenVotes ? 'R' : 'D';
      }
      const record: Record = {
        state: rs.statecode,
        stateName: rs.statelongname,
        electoral: +rs.electoralcollegeseats,
        winner: !isCounting ? leader : undefined,
        isRunOff: !isCounting,
        leader,
        trumpVotes,
        bidenVotes,
        trumpShare: +rs.trumppercentagescraped,
        bidenShare: +rs.bidenpercentagescraped,
      };
      return record;
    })
    .filter((record) => !!record) as Record[];
}

export const counting = ['PA', 'GE', 'NC', 'AK', 'AZ', 'WI', 'GA'];
