import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts && savedContacts.length > 0) {
      this.setState({ contacts: savedContacts });
    } else {
      this.setState({ contacts: initialContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onChangeInput = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const nameExists = this.state.contacts.some(
      value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (nameExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    const contacts = [...this.state.contacts, newContact];

    this.setState({ contacts });
  };

  filter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name[0].toLowerCase().includes(filter.toLowerCase())
    );
  };

  delContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        <ContactList delContact={this.delContact} contacts={this.filter()} />
      </div>
    );
  }
}
