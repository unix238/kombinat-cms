import * as React from 'react';
import { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import '../../styles/index.css';

import {
  fetchItems,
  fetchBrands,
  fetchCategories,
  fetchTags,
} from '../../actions/itemsActions';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { DataGrid } from '@mui/x-data-grid';
import { AddEditDialog } from '../../components/AddEditDialog';
const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Title ', width: 220 },
  { field: 'description', headerName: 'Description', width: 220 },
  { field: 'brand', headerName: 'Brand' },
  { field: 'categories', headerName: 'Categories', width: 220 },
  { field: 'price', headerName: 'Price' },
  { field: 'quantity', headerName: 'Quantity' },
  { field: 'images', headerName: 'Images' },
  { field: 'tags', headerName: 'Tags', width: 220 },
  { field: 'sizes', headerName: 'Sizes' },
  { field: 'characteristics', headerName: 'Characteristics', width: 220 },
];

export const Item = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [dataRows, setDataRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Товары';
    dispatch(fetchItems(setItems));
    setFilteredItems(items);

    dispatch(fetchBrands(setBrands));
    dispatch(fetchCategories(setCategories));
    dispatch(fetchTags(setTags));
  }, [dispatch]);

  useEffect(() => {
    if (brands.length > 0 && categories.length > 0 && tags.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [brands, categories, tags]);

  useEffect(() => {
    const data = items.map((item) => {
      return {
        id: item._id,
        title: item.title,
        description: item.description,
        brand: brands.find((brand) => brand._id === item.brand).title,
        categories: categories
          .filter((category) => item.categories.includes(category._id))
          .map((category) => category.title)
          .join(', '),
        price: item.price,
        quantity: 100,
        // quantity: item.quantity,
        images: item.images.join(', '),
        tags: tags
          .filter((tag) => item.tags.includes(tag._id))
          .map((tag) => tag.title)
          .join(', '),
        sizes: item.sizes.join(', '),
        characteristics: item.characteristics,
      };
    });
    setDataRows(data);
    setFilteredItems(data);
  }, [items]);

  useEffect(() => {
    setFilteredItems(
      dataRows.filter((row) =>
        Object.values(row).some(
          (val) =>
            typeof val === 'string' &&
            val.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  }, [searchText]);

  const currentHandler = (e) => {
    setCurrentItem(items.find((item) => item._id === e.row.id));
    setOpenAddEditDialog(true);
  };

  return (
    <div className='root'>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
      </Box>
      <Container maxWidth='xl'>
        <TextField
          label='Поиск'
          variant='outlined'
          sx={{ width: '80%', marginBottom: '20px' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant='outlined' onClick={() => setOpenAddEditDialog(true)}>
          Добавить Новый Товар
        </Button>
        {!isLoading ? (
          <AddEditDialog
            brands={brands}
            categories={categories}
            tags={tags}
            open={openAddEditDialog}
            setOpen={setOpenAddEditDialog}
            current={currentItem ? currentItem : null}
          />
        ) : (
          <></>
        )}

        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid
            rows={filteredItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={currentHandler}
          />
        </div>
        {currentItem && (
          <div className='content'>
            <ItemCard item={currentItem} />
          </div>
        )}
      </Container>
    </div>
  );
};
