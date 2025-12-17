angular.module("taskManagerApp").component("noteItem", {
  bindings: { note: "<" },
  template: `
   <div class="note-item">
        <h3>{{$ctrl.note.title}}</h3>
        <div class="tags">
          <span ng-if="$ctrl.note.groupTag">{{$ctrl.note.groupTag}}</span>
          <span ng-if="$ctrl.note.subTag">{{$ctrl.note.subTag}}</span>
        </div>
      </div>
  `,
});
