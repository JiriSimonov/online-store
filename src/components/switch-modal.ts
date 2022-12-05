import BaseComponent from './base-component';

export default class SwitchModal extends BaseComponent {
  private modalTitle: BaseComponent;

  private modalAviable: BaseComponent;

  private modalItem: BaseComponent;

  private modalManafucturer: BaseComponent;

  private modalType: BaseComponent;

  private modalPower: BaseComponent;

  private modalWay: BaseComponent;

  private modalDescription: BaseComponent;

  constructor() {
    super({ className: 'modal' });
    this.modalTitle = new BaseComponent({
      tag: 'h2',
      className: 'modal__title',
      parent: this.node,
      text: 'test',
    });

    this.modalAviable = new BaseComponent({
      className: 'modal__av',
      parent: this.node,
      text: 'Нет в наличии',
    });
    this.modalItem = new BaseComponent({
      tag: 'div',
      className: 'modal__info',
      parent: this.node,
    });

    this.modalManafucturer = new BaseComponent({ className: 'modal_manuf', text: 'Производитель: dsadsa' });
    this.modalType = new BaseComponent({ className: 'modal_type', text: 'Тип: dsadsa' });
    this.modalPower = new BaseComponent({ className: 'modal_power', text: 'Сила нажатия: dsadsa' });
    this.modalWay = new BaseComponent({ className: 'modal_way', text: 'Длина пути: dsadsa' });

    this.modalItem.appendEl(
      [
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
      text: 'Test description',
    });
  }
}
