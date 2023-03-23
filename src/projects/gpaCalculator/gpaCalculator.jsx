import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Table, Form } from 'react-bootstrap';
import { Col, Row, Modal } from 'react-bootstrap';
import { Circle } from 'rc-progress';

import '../projects.css';

const GPA = () => {
  const [lock, setLock] = useState(false);
  const [gpa, setGPA] = useState(0.0);
  const [toggle, setToggle] = useState(false);
  const [scale, setScale] = useState('4.0');

  const [showPercentage, setShowPercentage] = useState();
  const dragItem = useRef();
  const coursname = useRef();
  const dragOverItem = useRef();
  let user = JSON.parse(localStorage.getItem('user')) || [];

  const fGrade1 = {
    'A+': 4.3,
    A: 4.0,
    'A-': 3.7,
    'B+': 3.3,
    B: 3,
    'B-': 2.7,
    'C+': 2.3,
    C: 2,
    'C-': 1.7,
    'D+': 1,
    'D-': 0.7,
    F: 0,
  };
  const fGrade2 = {
    A: 4.0,
    'A-': 3.7,
    'B+': 3.3,
    B: 3,
    'B-': 2.7,
    'C+': 2.3,
    C: 2,
    'C-': 1.7,
    'D+': 1,
    'D-': 0.7,
    F: 0,
  };
  const fGrade3 = {};
  for (var i = 100; i > 0; i--) {
    fGrade3[i] = i;
  }
  const Grades2 = [
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D',
    'D',
    'D',
    'F',
    '-',
  ];

  const dragStart = (e, position) => {
    dragItem.current = position;
    document.getElementsByClassName('drg').style.cursor = 'move';
  };
  const dragEnter = (e, position) => {
    e.preventDefault();
    dragOverItem.current = position;
    document.getElementsByClassName('drg').style.cursor = 'move';
  };
  const drop = (id, e) => {
    semesters
      .filter((value) => id === value.id)
      .map((val) => {
        const copyListItems = val.courses;
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setCheck(!check);
      });
  };

  const [courseValue, setCourseValue] = useState('');
  const [percentage, setPercentage] = useState();
  const [grades, setGrades] = useState(Grades2);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [switchPen, setSwitchPen] = useState(false);
  const [checkIndex, setCheckIndex] = useState();
  const [semSwitchPen, setSemSwitchPen] = useState(false);
  const [currentSemSwitch, setCurrentSemSwitch] = useState(null);
  const [check, setCheck] = useState(true);
  const [courseCounter, setCourseCounter] = useState(4);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();

  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: 'Semester',
      courses: [
        {
          id: 1,
          name: 'Computer Science 1',
          credit: 4,
          grade: 'A-',
          objgrade: 'B',
          colorClass: 'Aclass',
        },
        {
          id: 2,
          name: 'Computer Science 2',
          credit: 4,
          grade: 'A',
          objgrade: 'B',
          colorClass: 'Aclass',
        },
        {
          id: 3,
          name: 'Computer Science 3',
          credit: 4,
          grade: 'A',
          objgrade: 'B',
          colorClass: 'Aclass',
        },
        {
          id: 4,
          name: 'Computer Science 4',
          credit: 4,
          grade: 'A',
          objgrade: 'A',
          colorClass: 'Fclass',
        },
      ],
    },
  ]);

  const handleChange = (value, semesterId, courseId, type) => {
    const updatedSemesters = semesters.map((semester) => {
      if (semester.id == semesterId) {
        semester.courses.map((course) => {
          if (type === 'credit') {
            if (course.id == courseId) {
              course[type] = value;
            }
          } else {
            if (course.id == courseId) {
              course[type] = value;
              course.colorClass =
                fGrade2[value] >= fGrade2[course.objgrade]
                  ? 'Aclass'
                  : 'Fclass';
            }
          }

          return course;
        });
      }
      return semester;
    });

    setSemesters(updatedSemesters);
  };

  const handleChangeObjGrade = (value, semesterId, courseId, type) => {
    const updatedSemesters = semesters.map((semester) => {
      if (semester.id == semesterId) {
        semester.courses.map((course) => {
          if (course.id == courseId) {
            course[type] = value;
            course.colorClass =
              fGrade2[value] <= fGrade2[course.grade] ? 'Aclass' : 'Fclass';
          }

          return course;
        });
      }
      return semester;
    });
    setSemesters(updatedSemesters);
  };
  let gradingSet = [];

  const handleGPAScaleChange = (e) => {
    if (e.target.value === '4.3') {
      Object.keys(fGrade1).forEach(function (key) {
        gradingSet.push(key);
        setGrades(gradingSet);
        setToggle(false);
      });
      setSemesters((prevValue) => {
        const newSemester = prevValue?.map((element) => {
          return {
            ...element,
            courses: element?.courses?.map((c) => {
              return { ...c, grade: 'F' };
            }),
          };
        });

        return newSemester;
      });
    } else if (e.target.value === '4.0') {
      Object.keys(fGrade2).forEach(function (key) {
        gradingSet.push(key);
        setGrades(gradingSet);
        setToggle(false);
      });
      setSemesters((prevValue) => {
        const newSemester = prevValue?.map((element) => {
          return {
            ...element,
            courses: element?.courses?.map((c) => {
              return { ...c, grade: 'F' };
            }),
          };
        });

        return newSemester;
      });
    } else if (e.target.value === 'percentage') {
      Object.keys(fGrade3).forEach(function (key) {
        gradingSet.push(key);
        setGrades(gradingSet);
        setToggle(true);
      });
      setSemesters((prevValue) => {
        const newSemester = prevValue?.map((element) => {
          return {
            ...element,
            courses: element?.courses?.map((c) => {
              return { ...c, grade: '70' };
            }),
          };
        });

        return newSemester;
      });
    } else {
      setToggle(true);
    }

    setScale(e.target.value);
  };

  const addNewCourse = (id, ev = null, semester) => {
    const courseName = courseValue || ev.target.value || null;
    // if (!courseName) {
    //     alert('Plz Add Course Name');
    //     return;
    // }
    semesters
      .filter((value) => id === value.id)
      .map((val) => {
        val.courses.push({
          id: Date.now().toString(),
          name: courseName,
          credit: 0,
          grade: '-',
          objgrade: '-',
        });
        setCheck(!check);
      });
    coursname.current.value = '';
    setCourseValue('');
    setCourseCounter(courseCounter + 1);
  };
  const handleAddition = (ev, id, semester) => {
    {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        addNewCourse(id, ev, semester);
      }
    }
  };
  const [semLength, setSemLength] = useState(0);
  const handleAdditionSem = () => {
    let addSemester = {
      id: semesters.length + 1,
      name: 'Semester' + ' ' + (semesters.length + 1),
      courses: [
        {
          id: Date.now().toString(),
          name: 'Computer Scienc 1',
          credit: 0,
          grade: '-',
          objgrade: '-',
        },
      ],
    };
    setSemLength(semesters.length + 1);
    setSemesters([...semesters, addSemester]);
  };
  const handleChangeCourse = (e, cid, sid) => {
    const filteredSemestersName = semesters.map((semester) => {
      if (semester.id == sid) {
        semester.courses.map((course) => {
          if (course.id == cid) course.name = e.target.value;
        });
      }
      return semester;
    });
    setSemesters(filteredSemestersName);
  };

  const [semesterName, setSemesterName] = useState('');
  const handleChangeSemester = (e) => {
    const filteredSemesters = semesters.map((semester) => {
      if (semester) {
        setSemesterName(e.target.value);
      }
      return semester;
    });
  };
  const delCourse = (cid, sid) => {
    const filteredSemesters = semesters.map((semester) => {
      if (semester.id == sid) {
        const filteredCourses = semester.courses?.filter(
          (course) => course.id !== cid
        );
        semester.courses = filteredCourses;
      }
      return semester;
    });
    setSemesters(filteredSemesters);
  };
  const delSemester = (sid) => {
    setSemesters(semesters?.filter((sem) => sem.id !== sid));
  };
  useEffect(() => {
    let totalSum = 0;
    if (semesters?.length) {
      for (let semester of semesters) {
        totalSum += getGradeValue(semester);
      }
    }
    setGPA(totalSum / semesters?.length);
    setPercentage((totalSum / semesters?.length) * 100 * 100);
  }, [semesters, setGPA, scale, setScale]);

  // useEffect(() => {
  //     handleGPAScaleChange();
  // }, [scale, setScale]);

  const getGradeValue = (semester) => {
    let sum = 0;
    let totalCreditHours = 0;

    switch (scale) {
      case '4.3':
        for (let course of semester?.courses) {
          sum = sum + fGrade1[course.grade] * course.credit;
          totalCreditHours += course.credit;
        }
        return sum / totalCreditHours;

      case '4.0':
        for (let course of semester?.courses) {
          sum = sum + fGrade2[course.grade] * course.credit;
          totalCreditHours += course.credit;
        }
        return sum / totalCreditHours;

      case 'percentage':
        for (let course of semester?.courses) {
          sum = sum + fGrade3[course.grade];
          totalCreditHours += 1;
        }
        return (sum / (totalCreditHours * 100)) * 100;

      default:
        break;
    }
  };
  const [autofocus, setAutoFocus] = useState(false);
  const switchautofocus = () => {
    setAutoFocus(!autofocus);
  };

  const editSemesterPen = (idx) => {
    setCurrentSemSwitch(idx);

    setSemSwitchPen(!semSwitchPen);
  };
  const saveSemesterPen = (idx, id) => {
    setCurrentSemSwitch(idx);
    setSemesters((prevValue) => {
      return prevValue.map((element) => {
        if (element?.id === id) {
          return { ...element, name: semesterName };
        }
        return element;
      });
    });
    setSemesterName('');
    setSemSwitchPen(!semSwitchPen);
  };

  return (
    <>
      <div className='gp-block'>
        <Container>
          <Row>
            <Col xs={6} md={9}>
              <h1>
                <b>GPA Calculator</b>
              </h1>
              <p></p>
            </Col>

            <Col xs={6} md={3}>
              <div className='mx-2 position-relative rt-box gpablock'>
                <Circle
                  percent={
                    gpa
                      ? scale == '4.0'
                        ? (gpa.toFixed(2) * 100) / 4
                        : (gpa.toFixed(2) * 100) / 4.3
                      : 0
                  }
                  strokeWidth='4'
                  strokeColor={{
                    '0%': '#114281',
                    '80%': '#00bbf3',
                  }}
                />
                {!toggle === true ? (
                  <h6 className='prof-val67'>
                    <span>{gpa ? gpa.toFixed(2) : 0.0}</span> <br /> GPA
                  </h6>
                ) : (
                  <h6 className='prof-val67'>
                    <span>
                      {' '}
                      {showPercentage} <br /> %
                    </span>
                  </h6>
                )}

                {/* <button onClick={toggletoPercent}>%</button> */}

                {/* <div>
                                    <img className="percenttogl" src="../assets/percent.svg" onClick={toggletoPercent}></img>
                                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
        <div className='semester-credit py-5'>
          <div className='block-container'>
            <Container className='semester-table'>
              <div className='mb-4'>
                <div
                  className='text-end d-flex justify-content-end'
                  style={{ marginTop: '-40px' }}
                >
                  <Form.Select
                    className='form-control form-select private'
                    style={{ backgroundColor: 'transparent' }}
                    onChange={(e) => handleGPAScaleChange(e)}
                    size='lg'
                  >
                    <option value='4.0'>4.0 Scale</option>
                    <option value='4.3'>4.3 Scale</option>
                    <option value='percentage'>Percentage %</option>
                  </Form.Select>
                </div>
              </div>
              {semesters?.map((semester, index) => {
                return (
                  <Table size='sm' key={index} className='ps-2'>
                    <thead>
                      <tr>
                        <th className='yersm'>Year & Semester</th>
                        <div className='course-th'>
                          <th className='ps-3'>Course Name</th>
                          <th className='ps-3'>Credits</th>
                          <th>Final Grade</th>
                          <th>Objective Grade</th>
                        </div>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        <tr>
                          <td className='semtd'>
                            <span className='semdel'>
                              <button
                                alt='del'
                                className='widht-btn'
                                onClick={() => delSemester(semester.id)}
                              >
                                Delete Semester
                              </button>
                            </span>
                            <div className='semesterarea'>
                              <div className='coursedel'>
                                {semSwitchPen === true &&
                                currentSemSwitch === index ? (
                                  <button
                                    alt='trash edit'
                                    className='editpen'
                                    onClick={() =>
                                      saveSemesterPen(index, semester?.id)
                                    }
                                  >
                                    Edit Semester
                                  </button>
                                ) : (
                                  <button
                                    alt='trash edit'
                                    className='editpen'
                                    onClick={() => editSemesterPen(index)}
                                  >
                                    edit semester
                                  </button>
                                )}
                              </div>
                              <Form.Control
                                type='text'
                                name='semestername'
                                onChange={(e) => handleChangeSemester(e)}
                                //value={semLength === semesters.id ? semesterName : null}
                                value={
                                  semSwitchPen && currentSemSwitch === index
                                    ? semesterName
                                    : semester.name
                                }
                                className={'resfield, seminpt'}
                                placeholder='Add Semester Name'
                                disabled={semSwitchPen === true ? false : true}
                              />
                            </div>
                          </td>
                          {semester?.courses?.map((course, index) => {
                            return (
                              <>
                                <div
                                  className='course-td ps-3 drg'
                                  key={index}
                                  draggable={true}
                                >
                                  <td draggable>
                                    <span className='coursedel'>
                                      <button
                                        alt='del'
                                        onClick={() =>
                                          delCourse(course.id, semester.id)
                                        }
                                      >
                                        del
                                      </button>
                                    </span>
                                    <div
                                      className='drags-lists'
                                      onDragStart={(e) => dragStart(e, index)}
                                      onDragEnter={(e) => dragEnter(e, index)}
                                      onDragEnd={() => drop(semester.id)}
                                      key={index}
                                      draggable={true}
                                    >
                                      <Form.Control
                                        ref={
                                          focusIndex === course?.id
                                            ? inputRef
                                            : null
                                        }
                                        type='text'
                                        name='coursename'
                                        value={course.name}
                                        onChange={(e) =>
                                          handleChangeCourse(
                                            e,
                                            course.id,
                                            semester.id
                                          )
                                        }
                                        className={'resfield'}
                                        placeholder='Add Course Name'
                                        disabled={
                                          switchPen === false &&
                                          checkIndex === course.id
                                            ? false
                                            : true
                                        }
                                      />
                                      <div className='coursedel'>
                                        {switchPen === false &&
                                        checkIndex === course.id ? (
                                          <img
                                            src='../assets/Save.svg'
                                            alt='trash edit'
                                            onClick={async () => {
                                              await handlePen();
                                              setCheckIndex(course.id);
                                            }}
                                            className='editpen'
                                          />
                                        ) : (
                                          <button
                                            alt='trash edit'
                                            onClick={async () => {
                                              await setFocusIndex(course.id);
                                              setInputFocus();
                                              handlePen();
                                              setCheckIndex(course.id);
                                            }}
                                            className='editpen'
                                          >
                                            edit
                                          </button>
                                        )}
                                      </div>

                                      {/* <span>{course.name}</span> */}
                                    </div>
                                  </td>
                                  <td className='sml-btn ps-3'>
                                    <input
                                      type='number'
                                      className='credits-input'
                                      placeholder='4'
                                      min='1'
                                      max='10'
                                      value={course.credit}
                                      onChange={(e) =>
                                        handleChange(
                                          parseInt(e.target.value),
                                          semester.id,
                                          course.id,
                                          'credit'
                                        )
                                      }
                                    />
                                    <Button>Add Credit</Button>
                                  </td>
                                  <td className='sml-btn'>
                                    <div className='fgrade'>
                                      <Form.Select
                                        aria-label='Default select example'
                                        onChange={(e) =>
                                          handleChange(
                                            e.target.value,
                                            semester.id,
                                            course.id,
                                            'grade'
                                          )
                                        }
                                        className='text-white'
                                        value={course.grade}
                                      >
                                        {grades?.map((val, i) => {
                                          return (
                                            <option key={i} value={val}>
                                              {val}
                                            </option>
                                          );
                                        })}
                                      </Form.Select>
                                      <Button>Add Grade</Button>
                                    </div>
                                  </td>
                                  <td className='sml-btn'>
                                    <div className='fgrade'>
                                      <Form.Select
                                        aria-label='Default select example'
                                        onChange={(e) => {
                                          // handleChange(e.target.value, semester.id, course.id, 'objgrade')
                                          handleChangeObjGrade(
                                            e.target.value,
                                            semester.id,
                                            course.id,
                                            'objgrade'
                                          );
                                        }}
                                        className={
                                          course.colorClass || 'Cclass'
                                        }
                                        value={course.objgrade}
                                      >
                                        {grades.map((val, i) => {
                                          return (
                                            <option key={i} value={val}>
                                              {val}
                                            </option>
                                          );
                                        })}
                                      </Form.Select>
                                      <Button>Add Grade</Button>
                                    </div>
                                  </td>
                                </div>
                                {/* s<Button onClick={() => delCourse(course.id, semester.id)}>Delete {course.id}</Button> */}
                              </>
                            );
                          })}
                          <div style={{ margin: '10px' }}>
                            <span>
                              <button
                                alt='plus-add'
                                className='pluss-palner'
                                onClick={(ev) =>
                                  addNewCourse(semester.id, ev, semester)
                                }
                              >
                                add 1{' '}
                              </button>

                              <Form.Control
                                type='text'
                                ref={coursname}
                                onChange={(ev) =>
                                  setCourseValue(ev.target.value)
                                }
                                name='tezt'
                                onKeyPress={(ev) =>
                                  handleAddition(ev, semester.id, semester)
                                }
                                defaultValue=''
                                className='resfield academic'
                                placeholder='Add Course'
                              />
                            </span>
                          </div>
                        </tr>
                      </>

                      <tr className='border-tr mb-3'></tr>
                    </tbody>
                  </Table>
                );
              })}
              {/* <hr className="hrrow" /> */}
              <p>
                <span onClick={handleAdditionSem}>
                  {/* <button alt='plus-add' className='pluss-palner'>
                    {' '}
                    Add semester{' '}
                  </button> */}
                  <Form.Control
                    type='text'
                    name='tezt'
                    disabled
                    value='Add Semester'
                    className='resfield sem academic'
                    placeholder=' Add Semester'
                  />
                </span>
              </p>
            </Container>
            <br />
            <br />
          </div>
        </div>{' '}
      </div>
    </>
  );
};
export default GPA;
