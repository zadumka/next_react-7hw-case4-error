'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import css from './page.module.css';
import { Tag } from '@/types/note.js';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag: Tag | string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ['notes', debouncedSearchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        searchText: debouncedSearchQuery,
        page: currentPage,
        ...(tag !== 'All' && { tag }),
      }),
    placeholderData: keepPreviousData,
    initialData,
  });

  const changeSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}

            <button className={css.button}>Create note +</button>
          </header>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <NoteForm onClose={() => setIsModalOpen(false)} />
            </Modal>
          )}
          {notes.length > 0 && <NoteList notes={notes} />}
        </section>
      </main>
    </div>
  );
}
