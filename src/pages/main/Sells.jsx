import React from 'react';
import { Box } from '@mui/material';
import { SideBar } from '../../components/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../actions/itemsActions';

const columns = [
  { field: 'id', headerName: 'OrderID', width: 70 },
  { field: 'Address', headerName: 'Address', width: 130 },
  {
    field: 'Items',
    headerName: 'Items',
    width: 790,
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    width: 260,
  },
  {
    field: 'Status',
    headerName: 'Status',
    sortable: true,
    width: 160,
  },
];

export const Sells = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  let items = useSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(fetchOrders(setOrders));
  }, []);

  useEffect(() => {
    const newRows = orders.map((order) => {
      return {
        id: order._id,
        Address: order.address,
        Items: order.items
          .map((item) => {
            return `${item._id} size: ${item.size} quantity: ${item.quantity}`;
          })
          .join(', '),
        createdAt: order.createdAt,
        Status: order.status,
      };
    });
    setRows(newRows);
    console.log(orders);
  }, [orders]);

  const updateCurrentItem = (e) => {
    setSelected(items.filter((item) => item._id === e.row.id));
    console.log('items', items);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={updateCurrentItem}
        />
      </div>

      {selected.map((item) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <h1>{item.price}</h1>
          </div>
        );
      })}
    </div>
  );
};
