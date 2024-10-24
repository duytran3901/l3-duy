import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
} from "@material-ui/core";
import { IconButton, Icon } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from 'react-redux';
import { CERTIFICATE } from 'app/redux/actions/actions';
import moment from 'moment';
import CustomTable from '../components/CustomTable';
import { CustomColumnsCertificate } from '../components/CustomColumns';
import { ConfirmationDialog } from 'egret';

const TabCertificate = (props) => {
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(0);
  const { idEmployee } = props;
  const certificates = useSelector((state) => state.certificate.certificates);
  const totalCertificates = useSelector(state => state.certificate.totalElements);
  const [certificate, setCertificate] = useState({});
  const [certificateSelected, setCertificateSelected] = useState({});
  const [isConfirmDeleteCertificateOpen, setIsConfirmDeleteCertificateOpen] = useState(false);
  const dispatch = useDispatch();
  const dataTable = certificates?.map((certificate) => ({ ...certificate }));

  useEffect(() => {
    reloadTable();
  }, [])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCertificate({
      ...certificate,
      [name]: value,
    })
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setCertificate({
      ...certificate,
      [name]: inputValue,
    })
  };

  const handleCancel = () => {
    setCertificate({
      certificateName: '',
      issueDate: '',
      content: '',
      field: ''
    })
  }

  const handleEditCertificate = (rowData) => {
    console.log(rowData);
    
    if (rowData) {
      setCertificate(rowData);
    }
  }

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteCertificateOpen(true);
    setCertificateSelected(rowData);
  }

  const handleDeleteCertificate = (id) => {
    dispatch({ type: CERTIFICATE.DELETE_CERTIFICATE, payload: id })
    setIsConfirmDeleteCertificateOpen(false);
    setCertificateSelected({});
  }

  const reloadTable = () => {
    if (idEmployee) dispatch({ type: CERTIFICATE.GET_CERTIFICATES, payload: { employeeId: idEmployee } })
  }

  const action = ({ rowData }) => {
    return (
      <div>
        <IconButton size="small" onClick={() => handleEditCertificate(rowData)}>
          <Icon fontSize="small" color="primary">edit</Icon>
        </IconButton>
        <IconButton size="small" onClick={() => handleClickDelete(rowData)}>
          <Icon fontSize="small" color="error">delete</Icon>
        </IconButton>
      </div>
    )
  };

  const columns = CustomColumnsCertificate({ Action: action, page, pageSize });

  const handleSubmitForm = () => {
    console.log(certificate);
    if (certificate.id) {
      dispatch({ type: CERTIFICATE.UPDATE_CERTIFICATE, payload: { id: certificate.id, data: certificate } })
    } else {
      dispatch({ type: CERTIFICATE.CREATE_CERTIFICATE, payload: { employeeId: idEmployee, data: [certificate] }});
    }
    handleCancel();
    reloadTable();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                className="w-100 p-2"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Tên văn bằng
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                size="small"
                name="certificateName"
                variant="outlined"
                value={certificate.certificateName || ''}
                placeholder="Tên văn bằng"
                validators={[
                  "required"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập"
                ]}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    Ngày cấp
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="date"
                name="issueDate"
                size="small"
                variant="outlined"
                value={certificate.issueDate ? moment(certificate.issueDate).format("YYYY-MM-DD") : ''}
                validators={[
                  "required",
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                ]}
                inputProps={{
                  max: moment().format("YYYY-MM-DD")
                }}
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Lĩnh vực
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="field"
                size="small"
                variant="outlined"
                value={certificate.field || ''}
                placeholder="Lĩnh vực"
                validators={[
                  "required",
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                ]}
              />
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Nội dung văn bằng
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="content"
                size="small"
                variant="outlined"
                value={certificate.content || ''}
                placeholder="Nội dung văn bằng"
                validators={[
                  "required"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập"
                ]}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12} className='text-center'>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                className="mr-12"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-12"
                type='submit'
              >
                {certificate?.id ? 'Sửa văn bằng' : 'Thêm văn bằng'}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      <Grid item xs={12}>
        <CustomTable
          data={totalCertificates <= pageSize ? dataTable : dataTable.slice(page * pageSize, page * pageSize + pageSize)}
          columns={columns}
          total={totalCertificates}
          pageSize={pageSize}
          page={page}
          setPageSize={setPageSize}
          setPage={setPage}
          rowsPerPageOptions={[1, 2, 3, 5, 10]}
          height='calc(100vh - 556px)'
        />
      </Grid>
      {isConfirmDeleteCertificateOpen && (
        <ConfirmationDialog
          title='Bạn có chắc chắn muốn xóa chứng chỉ này không?'
          open={isConfirmDeleteCertificateOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteCertificateOpen(false)}
          onYesClick={() => handleDeleteCertificate(certificateSelected.id)}
          Yes='Có'
          No='Không'
        />
      )}
    </Grid>
  );
};

export default TabCertificate;