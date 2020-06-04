import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

// --------------- New ---------------
export type RecordType = 'expense' | 'income'

export type RawRecord = {
  id: string
  date: string
  categoryId: string
  amount: number
  note: string
  type: RecordType
}
// --------------- New ---------------

export type RecordItem = {
  tagIds: number[],
  note: string,
  category: '+' | '-',
  amount: number,
  createdAt: string // ISO 8601
}

type newRecordItem = Omit<RecordItem, 'createdAt'>

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);

  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, records);

  const addRecord = (newRecord: newRecordItem) => {
    if (newRecord.amount <= 0) {
      alert('Please enter the amount');
      return false;
    }
    if (newRecord.tagIds.length === 0) {
      alert('Please select at least a tag');
      return false;
    }
    const record = {...newRecord, createdAt: (new Date()).toISOString()};
    setRecords([...records, record]);
    return true;
  };
  return {records, addRecord};
};