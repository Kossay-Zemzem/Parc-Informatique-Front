import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-side-button',
  templateUrl: './side-button.component.html',
  styleUrls: ['./side-button.component.css']
})
export class SideButtonComponent {
  @Input() content = "unknown";
  @Input() iconName = "";

  @Input() activeState: boolean = false;
  @Input() isSideBarActive: boolean = true;
  @Output() buttonClicked = new EventEmitter();
  //styling variables
  textColorTcss: string = "text-gray-300";
  buttonBgTcss: string = "bg-transparent";
  buttonHoverBgTcss: string = "hover:bg-yellow-400 hover:bg-opacity-20";
  textHoverColorTcss: string = "group-hover:text-yellow-400";


  constructor() { }
  ngOnInit(): void {
    if (this.content === "Log out") {
      this.textColorTcss = "text-red-500";
      this.buttonHoverBgTcss = "hover:bg-[#f5ddd8]";
      this.textHoverColorTcss = "group-hover:text-red-600";
    } else {
      this.textColorTcss = "text-gray-300";
      this.buttonBgTcss = "bg-transparent";
      this.buttonHoverBgTcss = "hover:bg-yellow-400 hover:bg-opacity-20";
      this.textHoverColorTcss = "group-hover:text-yellow-400";
    }
    this.updateActiveStyle();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeState'] || changes['isSideBarActive']) {
      this.updateActiveStyle();
    }
  }

  onButtonClick(): void {
    if (this.isSideBarActive) {
      this.buttonClicked.emit();
    }
  }

  updateActiveStyle(): void {
    if (!this.isSideBarActive) {
      this.buttonBgTcss = "bg-transparent";
      this.buttonHoverBgTcss = "";
      this.textColorTcss = "text-gray-400";
      this.textHoverColorTcss = "";
      return;
    }
    if (this.activeState) {
      this.buttonBgTcss = "bg-yellow-400 bg-opacity-30";
      this.textColorTcss = "text-yellow-500";
    } else if (this.content === "Log out") {
      this.textColorTcss = "text-red-500";
      this.buttonBgTcss = "bg-transparent";
      this.buttonHoverBgTcss = "hover:bg-[#f5ddd8]";
      this.textHoverColorTcss = "group-hover:text-red-600";
    } else {
      this.textColorTcss = "text-gray-300";
      this.buttonBgTcss = "bg-transparent";
      this.buttonHoverBgTcss = "hover:bg-yellow-400 hover:bg-opacity-20";
      this.textHoverColorTcss = "group-hover:text-yellow-400";
    }
  }
}
