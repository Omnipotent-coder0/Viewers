import React, { useState } from 'react';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import * as Dialog from "@radix-ui/react-dialog";

function NoSegmentationRow({ onSegmentationAdd, addSegmentationClassName }) {
  const { t } = useTranslation('SegmentationTable');
  const [open, setOpen] = useState(false)
  const handleAddSegmentation = (e)=>{
    e.preventDefault();
    setOpen(false);
    localStorage.setItem("color",e.target.color.value)
    localStorage.setItem("segmentationName",e.target.segmentationName.value)
    localStorage.setItem("sampleLabel",e.target.sampleLabel.value)
    onSegmentationAdd();
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger>
    <div
      className={`group ${addSegmentationClassName}`}
      // onClick={}
      >
      <div className="text-primary-active group-hover:bg-secondary-dark flex items-center rounded-[4px] group-hover:cursor-pointer">
        <div className="grid h-[28px] w-[28px] place-items-center">
          <Icon name="icon-add" />
        </div>
        <span className="text-[13px]">{t('Add segmentation')}</span>
      </div>
    </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='inset-0 fixed bg-black/50' />
      <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
      <form onSubmit={handleAddSegmentation} className='bg-primary-light p-5 rounded-md gap-y-5' >
        <div>
          <label htmlFor="segmentationName">Enter Segmentation Name :</label><br />
          <input type="text" name='segmentationName' />
        </div>
        <div>
          <label htmlFor="color">Color : </label>
          <input type="color" name='color' />
        </div>
        <div>
          <label htmlFor="sampleLabel">Sample Label :</label>
          <select name="sampleLabel" id="sampleLabel">
            <option value="val 1">val 1</option>
            <option value="val 2">val 2</option>
            <option value="val 3">val 3</option>
          </select>
        </div>
          <div className='flex justify-center'>
            <button type="submit" className=' font-bold px-2 py-1 bg-blue-600 hover:bg-primary-main duration-100 rounded text-white'>Submit</button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
      </Dialog.Root>
  );
}

export default NoSegmentationRow;
