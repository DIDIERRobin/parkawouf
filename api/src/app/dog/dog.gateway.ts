import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { dogs } from './dog.data'
import {
  DOG_IS_IN_PARK,
  DOG_IS_OFF_PARK,
  LIST_ALL_DOGS,
  socketDogNamespace,
  tListAllDogsEventOutputDto,
  tUpdateDogParkEventDto
} from "@parkawouf/shared";

@WebSocketGateway({
  namespace: `/${socketDogNamespace}`,
  cors: {
    origin: '*',
  },
})
export class DogsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private _isDogPresent: tListAllDogsEventOutputDto = Object.fromEntries(dogs.map((dog) => [dog.id, false]));

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('DogsGateway');

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit(LIST_ALL_DOGS, this._isDogPresent);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(DOG_IS_IN_PARK)
  handleDogInPark(client: any, payload: tUpdateDogParkEventDto): void {
    this.logger.log(`Dog in park: ${JSON.stringify(payload)}`);
    this._isDogPresent[payload.dogId] = true;
    this.server.emit(LIST_ALL_DOGS, this._isDogPresent);
  }

  @SubscribeMessage(DOG_IS_OFF_PARK)
  handleDogOffPark(client: any, payload: tUpdateDogParkEventDto): void {
    this.logger.log(`Dog off park: ${JSON.stringify(payload)}`);
    this._isDogPresent[payload.dogId] = false;
    this.server.emit(LIST_ALL_DOGS, this._isDogPresent);
  }
}
