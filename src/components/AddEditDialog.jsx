import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { addItem, updateItem, deleteItem } from '../actions/itemsActions';
import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useRef, useState } from 'react';
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const AddEditDialog = ({
  brands,
  categories,
  tags,
  open,
  setOpen,
  current,
}) => {
  const ITEM_HEIGHT = 48;
  const theme = useTheme();
  const [selectCategories, setSelectCategories] = React.useState([]);
  const [selectBrands, setSelectBrands] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState([]);
  const [itemId, setItemId] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemSizes, setItemSizes] = useState('');
  const [itemCharacteristics, setItemCharacteristics] = useState('');
  const [itemImageName, setItemImageName] = useState('');

  const dispatch = useDispatch();
  const selledID = useSelector((state) => state.auth.user.user._id);
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    console.log('current', current);
    if (current) {
      setSelectBrands(current.brand);
      setSelectCategories(
        categories.filter((cat) => current.categories.includes(cat._id))
      );
      setSelectedTags(tags.filter((tag) => current.tags.includes(tag._id)));
      setItemCharacteristics(current.characteristics);
      setItemDescription(current.descriptions);
      setItemImage(current.images);
      setItemPrice(current.price);
      setItemQuantity(current.quantity);
      setItemSizes(current.sizes);
      setItemTitle(current.title);
      setItemId(current._id);
    }
  }, [current]);

  const handleChange = (event, setter) => {
    const {
      target: { value },
    } = event;
    setter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleClear = () => {
    setSelectBrands([]);
    setSelectCategories([]);
    setSelectedTags([]);
    setItemCharacteristics('');
    setItemDescription('');
    setItemImage('');
    setItemPrice('');
    setItemQuantity(0);
    setItemSizes('');
    setItemTitle('');
    setItemId('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = async (e) => {
    setItemImage(e.target.files);
    await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        const base64 = await imageToBase64(file);
        setItemImage((prev) => [...prev, base64]);
      })
    );
  };

  const addNewItem = async () => {
    const newItem = {
      title: itemTitle,
      descriptions: itemDescription,
      price: itemPrice,
      images: itemImage,
      quantity: itemQuantity,
      sizes: itemSizes.split(','),
      characteristics: itemCharacteristics,
      brand: selectBrands,
      categories: selectCategories.map((cat) => cat._id),
      tags: selectedTags.map((tag) => tag._id),
    };
    console.log('newItem', newItem);
    dispatch(addItem(newItem));
    handleClear();
    handleClose();
  };

  const handleItemEdit = async () => {
    const newItem = {
      title: itemTitle,
      descriptions: itemDescription,
      price: itemPrice,
      images: itemImage,
      quantity: itemQuantity,
      // sizes: itemSizes.contains(',') ? itemSizes.split(',') : itemSizes,
      sizes: itemSizes.includes(',') ? itemSizes.split(',') : itemSizes,
      characteristics: itemCharacteristics,
      brand: selectBrands,
      categories: selectCategories.map((cat) => cat._id),
      tags: selectedTags.map((tag) => tag._id),
    };
    console.log('newItem', newItem);
    dispatch(updateItem(newItem, itemId));
    // handleClear();
    // handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteItem(itemId));
    handleClear();
    handleClose();
  };

  const imageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Добавить/Изменить товар</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Чтобы добавить товар, удалите все символы из поля ID
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='id'
          label='ID'
          type='text'
          fullWidth
          variant='standard'
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Название'
          type='email'
          fullWidth
          variant='standard'
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          label='Описание'
          type='text'
          fullWidth
          variant='standard'
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='price'
          label='Цена'
          type='number'
          fullWidth
          variant='standard'
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='quantity'
          label='Количество'
          type='number'
          fullWidth
          variant='standard'
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />

        <TextField
          autoFocus
          margin='dense'
          id='sizes'
          label='Размеры через запятую'
          type='text'
          fullWidth
          variant='standard'
          value={itemSizes}
          onChange={(e) => setItemSizes(e.target.value)}
        />
        <FormControl fullWidth margin='dense'>
          <Button variant='contained' component='label'>
            Загрузить изображение
            <input
              type='file'
              value={itemImageName}
              hidden
              multiple
              onChange={handleImageChange}
            />
          </Button>
        </FormControl>
        <TextField
          autoFocus
          margin='dense'
          id='characteristics'
          label='Характеристики'
          type='text'
          fullWidth
          variant='standard'
          value={itemCharacteristics}
          onChange={(e) => setItemCharacteristics(e.target.value)}
        />
        <FormControl fullWidth margin='dense'>
          <InputLabel id='demo-simple-select-label'>Брэнд</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Брэнд'
            value={selectBrands}
            onChange={(e) => setSelectBrands(e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem key={`brandsSelector${brand._id}`} value={brand._id}>
                {brand.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }} margin='dense'>
          <InputLabel id='demo-multiple-chip-label'>Категории</InputLabel>
          <Select
            labelId='demo-multiple-chip-label'
            id='demo-multiple-chip'
            multiple
            value={selectCategories}
            onChange={(e) => handleChange(e, setSelectCategories)}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={`chip${value._id}`} label={value.title} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((name) => (
              <MenuItem
                key={name._id}
                value={name}
                style={getStyles(name, selectCategories, theme)}
              >
                {name.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }} margin='dense'>
          <InputLabel id='demo-multiple-chip-label'>Тэги</InputLabel>
          <Select
            labelId='demo-multiple-chip-label'
            id='demo-multiple-chip'
            multiple
            value={selectedTags}
            onChange={(e) => handleChange(e, setSelectedTags)}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={`chip${value._id}`} label={value.title} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem
                key={name._id}
                value={name}
                style={getStyles(name, selectedTags, theme)}
              >
                {name.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отменить</Button>
        <Button
          variant='outlined'
          color='error'
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Удалить
        </Button>
        <Button
          variant='outlined'
          onClick={handleClear}
          startIcon={<ClearIcon />}
        >
          Очистить
        </Button>
        <Button
          variant='outlined'
          onClick={handleItemEdit}
          startIcon={<EditIcon />}
        >
          Изменить
        </Button>
        <Button variant='outlined' onClick={addNewItem} startIcon={<AddIcon />}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
