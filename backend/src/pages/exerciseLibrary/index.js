import { getAllExeLibrary, deleteExeLibrary, deleteMultExeLibrary, updateExeLibraryStatus } from '../../ApiServices';
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Icons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, IconButton, Button, Typography } from '@mui/material';
import swal from 'sweetalert';
import Switch from '@mui/material/Switch';
import { useUserState } from '../../context/UserContext';

const ExerciseLibrary = () => {
  const [datatableData, setdatatableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [baseurl, setbaseurl] = useState([]);
  const { userRole } = useUserState();

  const list = async () => {
    setIsLoading(true);
    await getAllExeLibrary()
      .then((response) => {
        setIsLoading(false);
        setdatatableData(response.data.info);
        setbaseurl(`${process.env.REACT_APP_API_KEY_IMAGE_EXELIBRARY_PATH}`);
      })
      .catch((err) => {
        if (!err.response.data.isSuccess) {
          if (err.response.data.status === 401) {
            toast.error(err.response.data.message);
            setIsLoading(false);
          } else {
            console.log(err.response.data, 'else');
          }
        }
      });
  };

  useEffect(() => {
    const redirectSuccess = localStorage.getItem('redirectSuccess');

    if (redirectSuccess === 'true') {
      // The value was found in local storage, perform actions as needed
      toast.success(localStorage.getItem('redirectMessage'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      // Remove the value from local storage
      localStorage.removeItem('redirectSuccess');
    }
    list();
  }, []);
  const columns = [
    {
      name: 'icon',
      label: 'Icon',
      options: {
        customBodyRender: (icon) =>
          icon ? (
            <img
              src={`${process.env.REACT_APP_API_KEY_IMAGE_EXELIBRARY_PATH}${icon}`}
              alt={icon}
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            />
          ) : (
            ''
          )
      }
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          const { status, _id } = datatableData[rowIndex];
          return (
            <Switch
              checked={status}
              onChange={() => {
                if (userRole == 1) {
                  const data = { id: _id, status: !status };
                  updateExeLibraryStatus(data, _id)
                    .then(() => {
                      toast.success('status changed successfully!', {
                        key: data._id
                      });
                      list();
                    })
                    .catch(() => {
                      toast.error('something went wrong!', {
                        key: data._id
                      });
                    });
                } else {
                  toast.error('Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.');
                }
              }}
            />
          );
        }
      }
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <Icons.Edit
                style={{
                  color: '#6495ED',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '5px',
                  margin: '0px 6px',
                  fontSize: '30px',
                  padding: '4px'
                }}
                onClick={() => {
                  if (userRole == 1) {
                    const editdata = datatableData.find((data) => data._id === value);
                    navigate('/exeLibrary/manage', { state: { editdata: editdata, imageurl: baseurl } });
                  } else {
                    toast.error(
                      'Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.'
                    );
                  }
                }}
              />
              <Icons.Delete
                style={{
                  color: '#FF5733',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '5px',
                  margin: '0px 6px',
                  fontSize: '30px',
                  padding: '4px'
                }}
                onClick={async () => {
                  if (userRole == 1) {
                    const confirm = await swal({
                      title: 'Are you sure?',
                      text: 'Are you sure that you want to delete this Excercise Library?',
                      icon: 'warning',
                      buttons: ['No, cancel it!', 'Yes, I am sure!'],
                      dangerMode: true
                    });
                    if (confirm) {
                      deleteExeLibrary(value)
                        .then(() => {
                          toast.success('deleted successfully!', {
                            key: value
                          });
                          list();
                        })
                        .catch(() => {
                          toast.error('something went wrong!', {
                            key: value
                          });
                        });
                    }
                  } else {
                    toast.error(
                      'Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.'
                    );
                  }
                }}
              />
            </div>
          );
        }
      }
    }
  ];

  const deleteMultiple = async (index) => {
    if (userRole == 1) {
      const ids = index.data.map((index1) => datatableData.find((data, index2) => index2 === index1.dataIndex && data._id)._id);
      const confirm = await swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to delete this Excercise Library?',
        icon: 'warning',
        buttons: ['No, cancel it!', 'Yes, I am sure!'],
        dangerMode: true
      });

      if (confirm) {
        deleteMultExeLibrary(ids)
          .then(() => {
            list();
            toast.success('Deleted successfully!', {
              key: ids
            });
          })
          .catch(() => {
            toast.error('Something went wrong!', {
              key: ids
            });
          });
      }
    } else {
      toast.error('Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.');
    }
  };

  const SelectedRowsToolbar = ({ selectedRows, data }) => {
    return (
      <div>
        <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
          <Icons.Delete />
        </IconButton>
      </div>
    );
  };

  const options = {
    customToolbarSelect: (selectedRows, data) => (
      <SelectedRowsToolbar selectedRows={selectedRows} data={data} columns={columns} datatableTitle="Excercise Library" />
    )
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ToastContainer />

          <div className="text-container">
            <div className="left-text">
              <Typography variant="h4" size="sm">
                Excercise Library
              </Typography>
            </div>
            <div className="right-text">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => {
                  if (userRole == 1) {
                    navigate('/exeLibrary/manage');
                  } else {
                    toast.error(
                      'Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.'
                    );
                  }
                }}
              >
                Add Excercise Library
              </Button>
            </div>
          </div>

          {isLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={26} fullWidth />
            </Grid>
          ) : (
            <MUIDataTable data={datatableData} columns={columns} options={options} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default ExerciseLibrary;
