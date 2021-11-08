import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Ticket } from "../models/ticket";

export default class TicketStore {
  ticketRegistry = new Map<string, Ticket>();
  selectedTicket: Ticket | undefined;
  isEditMode = false;
  isLoading = true;
  isProcessingRequest = false;

  constructor() {
    makeAutoObservable(this);
  }

  get tickets() {
    return Array.from(this.ticketRegistry.values());
  }

  setIsLoading = (state: boolean) => {
    this.isLoading = state;
  }

  setIsProcessingRequest = (state: boolean) => {
    this.isProcessingRequest = state;
  }

  setTickets = (tickets: Ticket[]) => {
    this.ticketRegistry = new Map(tickets.map(ticket => [ticket.id, ticket]));
  }

  loadTickets = async () => {
    this.setIsLoading(true);

    try {
      await agent.Tickets.list().then(response => {
        this.setTickets(response);
      });
    } catch (error) {
      console.log(error)
    } finally {
      this.setIsLoading(false);
    }
  }

  loadTicket = async (id: string) => {
    let ticket = this.getTicketFromMemory(id);

    if (ticket) {
      this.selectedTicket = ticket;
    }
    else {
      this.setIsLoading(true);

      try {
        ticket = await agent.Tickets.details(id);
        this.selectedTicket = ticket;
      } catch (error) {
        console.log(error);
      } finally {
        this.setIsLoading(false);
      }
    }

    return ticket;
  }

  createTicket = async (ticket: Ticket) => {
    this.setIsProcessingRequest(true);

    try {
      await agent.Tickets.create(ticket);

      runInAction(() => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.selectedTicket = ticket;
        this.isEditMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsProcessingRequest(false);
    }
  }

  updateTicket = async (ticket: Ticket) => {
    this.setIsProcessingRequest(true);

    try {
      await agent.Tickets.update(ticket);

      runInAction(() => {
        this.ticketRegistry.set(ticket.id, ticket);
        this.selectedTicket = ticket;
        this.isEditMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsProcessingRequest(false);
    }
  }

  deleteTicket = async (id: string) => {
    this.setIsProcessingRequest(true);

    try {
      await agent.Tickets.delete(id);

      runInAction(() => {
        this.ticketRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsProcessingRequest(false);
    }
  }

  private getTicketFromMemory = (id: string) => {
    return this.ticketRegistry.get(id);
  }
}