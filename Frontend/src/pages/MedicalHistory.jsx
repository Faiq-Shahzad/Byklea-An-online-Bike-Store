import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import { FaUserPlus, FaFilePrescription } from 'react-icons/fa';
import { GrFormClose } from 'react-icons/gr';
import axios from 'axios';
import { UserContext } from '../contexts/UserProvider';
import { doctorsData } from '../data/DoctorsData';
import { cpt4 } from '../data/cpt';
import { medicines } from '../data/Medicine';
import { backendUrl } from '../constants/urls';
import { recentTransactions } from '../data/dummy';

const MedicalHistory = () => {
  const { data, selectedPatient, setSelectedPatient } = useContext(UserContext);

  const [sympTitle, setSympTitle] = useState();
  const [prescription, setPrescription] = useState([]);
  const [disease, setDisease] = useState();
  const [med, setMeds] = useState();
  const [dosage, setDosage] = useState();
  const [no_of_dose, setNo_of_Dose] = useState();
  const [labTests, setLabTests] = useState([]);
  const [comments, setComments] = useState();
  const [symptoms, setSymptoms] = useState([]);
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const [recList, setRecList] = useState([]);

  // console.log(selectedPatient);
  const patient = selectedPatient;

  const addSymptomsHandler = (e) => {
    e.preventDefault();
    const symptom = {
      key: Math.random(),
      sym: sympTitle,
    };
    setSymptoms([...symptoms, symptom]);
    console.log(symptom.key);
    setSympTitle('');
  };

  const onDeleteHandler = (key) => {
    setSymptoms(symptoms.filter((element) => element.key !== key));
  };

  const addPrescriptionHandler = (e) => {
    e.preventDefault();
    console.log(prescription.includes(med));
    console.log(med);
    if (prescription.includes(med)) {
      alert('Prescription already exist');
    } else {
      setPrescription([
        ...prescription,
        {
          key: Math.random(),
          medicine: med,
          dosage,
          no_of_days: no_of_dose,
        },
      ]);
    }
  };

  const getMedicalRecord = async (patientId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}doctors/allmedicalrecords/${patientId}`, {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      });
      console.log('res ', res.data);
      setRecList(res.data);
      setLoading(false);
      // alert('medical record created ');
    } catch (e) {
      console.log(e);
      alert('unable to get medical record');
    }
  };

  // const createMedicalRecord = (e) => {
  //   e.preventDefault();

  //   const symptomArr = symptoms.map((item) => item.sym);

  //   console.log(symptomArr);
  //   const rec = {
  //     patientId: patient.cnic,
  //     diagnosis: disease,
  //     symptoms: symptoms.map((item) => item.sym),
  //     labTests: labTests.map((item) => (`${item.value} - ${item.label}`)),
  //     prescription: prescription.map((item) => ({ medicineName: item.medicine, qty: item.dosage, days: item.no_of_days })),
  //     recommendations: comments,
  //   };
  //   setRecord(rec);
  //   console.log('Rec', rec);
  //   sendMedicalRecord(rec);
  // };

  console.log(
    symptoms.map((item) => {
      console.log(item.sym);
    }),
  );

  console.log(record);

  const onDeleteMedicineHandler = (key) => {
    setPrescription(prescription.filter((element) => element.key !== key));
  };

  const date = new Date();
  const month = date.getMonth() + 1;
  const [todaydate, setDate] = useState(
    `${date.getDate()}/${month}/${date.getFullYear()}`,
  );

  const addLabTests = (selectedOp) => {
    setLabTests(selectedOp);
  };

  const cptData = cpt4;
  const meds = medicines;

  useEffect(() => {
    getMedicalRecord(patient.cnic);
  }, []);

  return (
    <div className="flex items-center h-full p-8">
      <div className="w-3/4 bg-gray-100 rounded-lg shadow-2xl p-8 m-4 mx-auto my-auto">
        <div className="flex place-content-center text-blue-400">
          <FaFilePrescription size={50} />
        </div>

        <h1 className="block w-full text-center text-blue-400 text-2xl font-bold mb-6">
          Medical History
        </h1>
        <form className="place-content-center">
          <fieldset className=" w-5/6 border-1 bg-gray-300 border-black rounded-md p-4 font-bold text-lg text-gray-900 mx-auto my-auto">
            <legend>Patient</legend>
            <div className="flex flex-row w-full">
              <div className="w-full flex flex-row ml-4 justify-between">
                <div className="flex flex-col font-semibold">
                  <label className="mb-2 text-base text-gray-900">
                    Patient Cnic:
                  </label>
                  <label className="mb-2 text-base text-gray-900">Name:</label>
                  <label className="mb-2 text-base text-gray-900">Email:</label>
                  <label className="mb-2 text-base text-gray-900">
                    Contact:
                  </label>
                  <label className="mb-2 text-base text-gray-900">
                    Date of Birth:
                  </label>
                  <label className="mb-2 text-base text-gray-900">
                    Gender:
                  </label>
                </div>
                <div className="flex flex-col">
                  <text className="mb-1 ">{patient.cnic}</text>
                  <text className="mb-1 ">{patient.name}</text>
                  <text className="mb-1 ">{patient.email}</text>
                  <text className="mb-1 ">{patient.contact}</text>
                  <text className="mb-1 ">{patient.dob}</text>
                  <text className="mb-1 ">{patient.gender}</text>
                </div>
                <div className="image place-content-between">
                  <img
                    className="rounded-full w-30 h-30"
                    src={`data:image/jpeg;base64,${patient.profile}`}
                    alt="doctor"
                  />
                </div>
              </div>
            </div>
            {/* <div className="w-full flex flex-row p-4 mt-2 bg-gray-200">
              <div className="flex flex-col font-semibold mr-4">
                <label className="mb-2 text-base text-gray-900">
                  Doctor Cnic:
                </label>
                <label className="mb-2 text-base text-gray-900">Name:</label>
                <label className="mb-2 text-base text-gray-900">Email:</label>
                <label className="mb-2 text-base text-gray-900">Contact:</label>
              </div>
              <div className="flex flex-col">
                <text className="mb-1 ">{data.cnic}</text>
                <text className="mb-1 ">{data.adminName}</text>
                <text className="mb-1 ">{data.adminEmail}</text>
                <text className="mb-1 ">{data.contact}</text>
              </div> */}
            {/* </div> */}
          </fieldset>
          {loading && <div className="my-5 text-center"> LOADING ... </div>}
          {!loading && (
            recList.map((rec)=> (
          <fieldset key={rec.Key} className="mt-4 border-1 border-black rounded-md p-4 font-bold text-lg text-gray-900 mx-auto my-auto">
            <legend>Prescription</legend>
            <div className="flex font-semibold justify-end w-full">
              <label className="mr-2">Date: </label>
              <input type="text" value={new Date(rec.Record.followUp).toLocaleDateString()} disabled />
            </div>

            <hr className="bg-black text-black mt-3 text-bold" />
            <div className="mt-3">
              <div className="flex mb-4 justify-center">
                <label
                  className="mb-2 mt-2 mr-4 font-bold text-lg text-gray-900"
                  htmlFor="cnic"
                >
                  Diagnosis
                </label>
                <input
                  className="border rounded-sm py-2 px-3 text-grey-800 text-normal"
                  type="text"
                  name="disease"
                  value={rec.Record.diagonsis}
                  // onChange={(e) => setDisease(e.target.value)}
                  placeholder="Disease"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  htmlFor="email"
                >
                  Symptoms
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-row overflow-scroll ">
                    {JSON.parse(rec.Record.symptoms).map((item) => (
                      <div className="bg-red-400 flex flex-row place-content-center items-center p-3 mr-4 rounded-md">
                        {item}
                        {/* <GrFormClose
                          size={24}
                          onClick={() => {
                            onDeleteHandler(item.key);
                          }}
                        /> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  htmlFor="email"
                >
                  Prescribe Medicine
                </label>
                {/* <div className="font-normal">
                    <Select
                      placeholder="Select Medicine"
                      name="medicines"
                      options={meds}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setMeds(e.value)}
                    />
                  </div> */}
              </div>

              <div className="grid grid-cols-2 mb-4">
                {/* <div>
                  <label
                    className="mb-2 mr-3 font-bold text-lg text-gray-900"
                    htmlFor="dosage"
                  >
                    Dosage
                  </label>
                  <input
                    className="border py-2 px-3 text-grey-800 w-3/4"
                    type="number"
                    min={0}
                    placeholder="No. of dosage at one time"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 mr-3 font-bold text-lg text-gray-900 w-3/4"
                    htmlFor="no_of_days"
                  >
                    No of Days
                  </label>
                  <input
                    className="border py-2 px-3 text-grey-800 w-1/2"
                    type="number"
                    min={0}
                    placeholder="Number"
                    required
                    value={no_of_dose}
                    onChange={(e) => setNo_of_Dose(e.target.value)}
                  />
                  <button
                    className="font-semibold ml-4 bg-blue-400 text-white p-2 rounded-md"
                    onClick={(e) => addPrescriptionHandler(e)}
                  >
                    Add
                  </button>
                </div> */}
              </div>

              <div className="grid grid-cols-1">
                <div className="flex flex-row overflow-scroll">
                  {rec.Record.prescription.map((item) => (
                    <div className="bg-rose-400 flex flex-row place-content-center items-center p-3 mr-4 rounded-md">
                      <span>
                        {item.medicineName} - Dose: {item.qty} - Days:{' '}
                        {item.days}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="bg-black text-black mt-3 mb-3 text-bold" />
              <div className="flex flex-col mb-4">
                <label
                  className="mb-2 font-bold text-lg text-gray-900"
                  htmlFor="email"
                >
                  Suggest Lab Tests
                </label>
                <div className="grid grid-cols-1">
                  <div className="flex flex-row overflow-scroll">
                    {JSON.parse(rec.Record.labTests).map((item) => (
                      <div className="bg-blue-400 flex flex-row place-content-center items-center p-3 mr-4 rounded-md">
                        <span>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label>Doctor Comments</label>
                <textarea
                  className="px-3 py-2 text-grey-800"
                  rows="4"
                  cols="50"
                  placeholder="Comments..."
                  value={rec.Record.recommendation}
                  disabled
                  // onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
          </fieldset>))
          )}

          {/* <button
            className="block bg-green-500 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded mt-5"
            onClick={(e) => createMedicalRecord(e)}
          >
            Confirm
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default MedicalHistory;
