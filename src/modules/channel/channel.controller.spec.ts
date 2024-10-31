import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateChannelDto } from './dto/createChannel.dto';
import { Channel } from './schemas/channel.schema';

describe('Channel Controller', () => {
  let channelController: ChannelController;
  let channelService: ChannelService;

  const mockChannelService = {
    CreateChannel: jest.fn(),
    findAll: jest.fn(),
    DeleteChannel: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [{ provide: ChannelService, useValue: mockChannelService }],
    }).compile();

    channelController = app.get<ChannelController>(ChannelController);
    channelService = app.get<ChannelService>(ChannelService);
  });

  describe("Creation d'un nouveau canal", () => {
    test('devkit crier un canal et renderer un message de success', async () => {
      const createChannelDto: CreateChannelDto = {
        Title: 'Sample Channel',
        members: ['5'],
        type: 'public',
        badWords: [],
      };

      const createdChannel: Channel = {
        ...createChannelDto,
      };

      mockChannelService.CreateChannel.mockResolvedValue(createdChannel);

      const response = await channelController.create(createChannelDto);

      expect(response).toEqual({
        message: 'Channel created successfully',
        channel: createdChannel,
      });
      expect(channelService.CreateChannel).toHaveBeenCalledWith(
        createChannelDto,
      );
      expect(channelService.CreateChannel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Recuperation de tous les canaux', () => {
    test('devrait retourner une liste de canaux', async () => {
      const channelList: Channel[] = [
        {
          Title: 'Channel 1',
          members: ['1', '2'],
          type: 'public',
          badWords: [],
        },
        { Title: 'Channel 2', members: ['3'], type: 'private', badWords: [] },
      ];

      mockChannelService.findAll.mockResolvedValue(channelList);

      const response = await channelController.findAll();

      expect(response).toEqual(channelList);
      expect(channelService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Suppression dun canal', () => {
    test('devrait supprimer un canal et renvoyer un message de succes', async () => {
      const channelId = '12345';

      mockChannelService.DeleteChannel.mockResolvedValue({ deleted: true });

      const response = await channelController.delete(channelId);

      expect(response).toEqual({ message: 'Channel deleted successfully' });
      expect(channelService.DeleteChannel).toHaveBeenCalledWith(channelId);
      expect(channelService.DeleteChannel).toHaveBeenCalledTimes(1);
    });
  });
});
