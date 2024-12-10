interface AddTodoLinkProps {
  openFormModal: () => void;
}

const AddTodoLink = ({ openFormModal }: AddTodoLinkProps) => {
  return (
    <>
      <label 
        htmlFor="new_item"
        onClick={(e) => {
          e.preventDefault();
          openFormModal();
        }}
      >
        <img src="images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
    </>
  )
}

export default AddTodoLink;