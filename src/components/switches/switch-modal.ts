import { getSwitchData } from '../../utils/get-switch-data';
import BaseComponent from '../elements/base-component';

export default class SwitchModal extends BaseComponent {
  private modalTitle: BaseComponent;

  private modalAviable: BaseComponent;

  private modalItem: BaseComponent;

  private modalManafucturer: BaseComponent;

  private modalType: BaseComponent;

  private modalPower: BaseComponent;

  private modalWay: BaseComponent;

  private modalDescription: BaseComponent;

  private modalImg: BaseComponent;

  constructor(id: string, isAvialable: boolean) {
    super({ className: 'modal' });
    this.modalTitle = new BaseComponent({
      tag: 'h2',
      className: 'modal__title',
      parent: this.node,
      text: getSwitchData(id, 'title') as string,
    });

    this.modalAviable = new BaseComponent({
      className: `${isAvialable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      text: `${isAvialable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.modalItem = new BaseComponent({
      tag: 'div',
      className: 'modal__info',
      parent: this.node,
    });
    this.modalImg = new BaseComponent({ className: 'modal__img' });
    this.modalManafucturer = new BaseComponent({ className: 'modal_manuf', text: 'Производитель: dsadsa' });
    this.modalType = new BaseComponent({ className: 'modal_type', text: 'Тип: dsadsa' });
    this.modalPower = new BaseComponent({ className: 'modal_power', text: 'Сила нажатия: dsadsa' });
    this.modalWay = new BaseComponent({ className: 'modal_way', text: 'Длина пути: dsadsa' });

    this.modalItem.appendEl(
      [
        this.modalImg,
        this.modalManafucturer,
        this.modalType,
        this.modalPower,
        this.modalWay,
      ],
    );

    this.modalDescription = new BaseComponent({
      tag: 'p',
      className: 'modal__description',
      parent: this.node,
      text: getSwitchData(id, 'description') as string,
    });
  }
}
