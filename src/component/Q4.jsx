import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import ReactToPrint from 'react-to-print'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Footer } from './Footer';
ChartJS.register(...registerables);
export const Q4 = () => {
  const myRef = useRef();
  const [diaryCount, setDiary] = useState(0);
  const [incommingCount, setIncoming] = useState(0);
  const [outgoingCount, setOutgoing] = useState(0);
  const [Summary, setSummary] = useState(false);
  const [detail, setDetail] = useState(true);


  const [listIncoming, setListIncoming] = useState([]);
  const incoming = JSON.stringify(listIncoming, null, 2)
  const finalIncoming = JSON.parse(incoming)

  const [listOutgoing, setListOutgoing] = useState([]);
  const outgoing = JSON.stringify(listOutgoing, null, 2)
  const finalOutgoing = JSON.parse(outgoing)

  const [listTransit, setListTransit] = useState([]);
  const transit = JSON.stringify(listTransit, null, 2)
  const finalTransit = JSON.parse(transit)

  const [listDiary, setListDiary] = useState([]);
  const diary = JSON.stringify(listDiary, null, 2)
  const finalDiary = JSON.parse(diary)

  const COUNT_DIARY_API_URL = "https://phma-rmu.herokuapp.com/diary-fourth-count"
  const COUNT_INCOMING_API_URL = "https://phma-rmu.herokuapp.com/fourth-count"
  const COUNT_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/fourth-count-out"

  const GET_DIARY_API_URL = "https://phma-rmu.herokuapp.com/diary-fourth-quarter"
  const GET_INCOMING_API_URL = "https://phma-rmu.herokuapp.com/fourth-quarter"
  const GET_OUTGOING_API_URL = "https://phma-rmu.herokuapp.com/fourth-quarter-out"
  const GET_TRANSIT_API_URL = "https://phma-rmu.herokuapp.com/fourth-quarter-transit"

  const summaryClick = () => {
    setSummary(false);
    setDetail(true)
  }

  const detailClick = () => {
    setSummary(true);
    setDetail(false)
  }

  useEffect(() => {
    axios.get(COUNT_DIARY_API_URL)
      .then(response => {
        setDiary(response.data);

      })
  }, []);



  useEffect(() => {
    axios.get(COUNT_INCOMING_API_URL)
      .then(response => {
        setIncoming(response.data);

      })
  }, []);

  useEffect(() => {
    axios.get(COUNT_OUTGOING_API_URL)
      .then(response => {
        setOutgoing(response.data);

      })
  }, []);



  useEffect(() => {
    axios.get(GET_INCOMING_API_URL)
      .then(response => {
        setListIncoming(response.data);
        console.log(response.data)

      })
  }, []);

  useEffect(() => {
    axios.get(GET_OUTGOING_API_URL)
      .then(response => {
        setListOutgoing(response.data);
        console.log(response.data)

      })
  }, []);



  useEffect(() => {
    axios.get(GET_TRANSIT_API_URL)
      .then(response => {
        setListTransit(response.data);
        console.log(response.data)

      })
  }, []);

  useEffect(() => {
    axios.get(GET_DIARY_API_URL)
      .then(response => {
        setListDiary(response.data);
        console.log(response.data)

      })
  }, []);
  return (
    <div className='annual-template'>
      <div className='print-button'>
        <div className='print-detailed' onClick={detailClick} id={detail ? 'show-detail' : 'hide-detail'}>View Detailed Report</div>
        <div className='print-detailed' onClick={summaryClick} id={Summary ? 'show-summary' : 'hide-summary'}>View Summary Report</div>
        <ReactToPrint
          trigger={() => <div className='print'>Print Report</div>}
          content={() => myRef.current}
        />
      </div>
      {detail &&
        <div className='annual-wrap' ref={myRef}>
          <div className='report-header'>(Report Summary) 4th Quarter</div>
          <div className='report-body'>

            <table className='table-width'>
              <tr>
                <th>Incoming</th>
                <th>Outgoing</th>
                {/* <th>File Diary</th> */}
                <th>Total</th>
              </tr>
              <tr>
                <td className='report-table'>{incommingCount}</td>
                <td className='report-table'>{outgoingCount}</td>
                {/* <td className='report-table'>{diaryCount}</td> */}
                <td className='report-table'>{incommingCount + outgoingCount}</td>
              </tr>
            </table>

            <div className='graph'>
              <div className='donut'>
              <Doughnut
                className="donut-graph"
                data={{

                  labels: ['Incoming', 'Outgoing'],
                  datasets: [{
                    data: [incommingCount, outgoingCount],
                    backgroundColor: ['red', 'yellow']
                  }]
                }}

              >
              </Doughnut>
              </div>
            </div>
          </div>
        </div>
      }
      {Summary &&
        <div className='detail-report' ref={myRef}>
          <div className='report-header'>(Report Detailed) Fourth Quarter</div>
          <div className='detail-wrapper'>

            <div className='incoming-detail'>
              <div className='detail-header'>Incoming Correspondence</div>
              <div className='detail-table'>
                <table className='table-width'>
                  <tr>
                    <th>Reference Number</th>
                    <th>Date Of Letter</th>
                    <th>Date Received</th>
                    <th>From Whom Received</th>
                    <th>Institution's Reference</th>
                    <th>Subject</th>
                    <th>Officer In charge</th>
                  </tr>
                  {finalIncoming.map((inputs, i) => {
                    return (
                      <tr key={i} className="side-nav-item" >
                        <td className='table-data'>{inputs.reference}</td>
                        <td className='table-data'>{inputs.dateOfLetter}</td>
                        <td className='table-data'>{inputs.dateReceived}</td>
                        <td className='table-data'>{inputs.fromWhomReceived}</td>
                        <td className='table-data'>{inputs.institutionsReference}</td>
                        <td className='table-data'>{inputs.subject}</td>
                        <td className='table-data'>{inputs.appUser.firstName}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <div className='detail-wrapper'>
            <div className='incoming-detail'>
              <div className='detail-header'>Outgoing Correspondence</div>
              <div className='detail-table'>
                <table className='table-width'>
                  <tr>
                    <th>Reference Number</th>
                    <th>Date Received For Dispatch</th>
                    <th>Date Dispatched</th>
                    <th>Subject</th>
                    <th>Addressee</th>
                    <th>Mode Of Dispatch</th>
                    <th>Officer In Charge</th>

                  </tr>
                  {finalOutgoing.map((out, i) => {
                    return (
                      <tr key={i} className="side-nav-item" >
                        <td className='table-data'>{out.reference}</td>
                        <td className='table-data'>{out.dateReceivedForDispatch}</td>
                        <td className='table-data'>{out.dateDispatched}</td>
                        <td className='table-data'>{out.subject}</td>
                        <td className='table-data'>{out.reference}</td>
                        <td className='table-data'>{out.modeOfDispatch}</td>
                        <td className='table-data'>{out.appUser.firstName}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <div className='detail-wrapper'>
            <div className='incoming-detail'>
              <div className='detail-header'>File Diary</div>
              <div className='detail-table'>
                <table className='table-width'>
                  <tr>
                    <th>File Reference Number</th>
                    <th>Date Opened</th>
                    <th>File Title</th>
                    <th>Department</th>
                    <th>Activity</th>
                    <th>Previous Reference Number</th>
                  </tr>

                  {finalDiary.map((transit, i) => {
                    return (
                      <tr key={i} className="side-nav-item" >
                        <td className='table-data'>{transit.reference}</td>
                        <td className='table-data'>{transit.dateOpened}</td>
                        <td className='table-data'>{transit.fileTitle}</td>
                        <td className='table-data'>{transit.department.name}</td>
                        <td className='table-data'>{transit.unit.name}</td>
                        <td className='table-data'>{transit.previousFileNumber}</td>

                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <div className='detail-wrapper'>
            <div className='incoming-detail'>
              <div className='detail-header'>File Transit</div>
              <div className='detail-table'>
                <table className='table-width'>
                  <tr>
                    <th>File Reference Number</th>
                    <th>File Title</th>
                    <th>Sent To</th>
                    <th>Date</th>
                    <th>Remarks</th>
                    <th>Officer In Charge</th>
                    <th>Signature</th>
                  </tr>

                  {finalTransit.map((diary, i) => {
                    return (
                      <tr key={i} className="side-nav-item" >
                        <td className='table-data'>{diary.reference}</td>
                        <td className='table-data'>{diary.fileTitle}</td>
                        <td className='table-data'>{diary.sentTo}</td>
                        <td className='table-data'>{diary.date}</td>
                        <td className='table-data'>{diary.remarks}</td>
                        <td className='table-data'>{diary.appUser.firstName}</td>
                        <td className='table-data'>{diary.signature}</td>

                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}
