import {
    trigger,
    state,
    style,
    transition,
    animate,
    query,
    group
  } from '@angular/animations';
  
  export const RouteAnim = trigger('RouteAnim', [
    /**
     * Transition any component to any component
     */
    // transition('* => *', [
  
    /**
     * Transition when data value increases
     * (data value from app-routing data objects for each route)
     */
      transition(':increment', [
      style({
        position: 'relative',
        // overflow: 'hidden'
      }),
      /**
       * Target both entering and leaving components
       */
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ], { optional: true }),
      /**
       * On initialize, set the entering component styles
       */
      // query(':enter', [
      //   style({
      //     opacity: 0,
      //   })
      // ], { optional: true }),
  
      /**
       * Group animations, so they happen at the same time
       * In this case, one fades out as the other fades in
       *
       * Can remove the query :leave, :enter if we don't
       * want the transitions to happen together
       */
      group([
        /**
         * Transition out for the leaving component
         */
        query(':leave', [
          animate('700ms ease-in', style({
            opacity: 0,
            transform: 'translateX(-80px)' // move leave component to the left
          }))
        ], { optional: true }),
  
        /**
         * Use query to select the entering element and begin transition
         */
        query(':enter', [
          style({
            transform: 'translateX(80px)', // move enter component to the right
            opacity: 0,
          }),
          /**
           * Animate to the end state with opacity of one
           */
          animate('700ms 520ms ease-out', style({ // 120ms delay
            opacity: 1,
            transform: 'translateX(0)'
          }))
          /**
           * TODO: // look at what optional: true is for
           */
        ], { optional: true })
      ]),
    ]),
      /**
       * Transition when data value decreases
       * (data value from app-routing data objects for each route)
       */
      transition(':decrement', [
        style({
          position: 'relative',
  
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
  
        group([
          query(':leave', [
            animate('700ms ease-in', style({
              opacity: 0,
              transform: 'translateX(80px)' // move leaving component to the right
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'translateX(-80px)', // move enter component to the left
              opacity: 0,
            }),
            animate('700ms 520ms ease-out', style({ // 520ms delay
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ]),
      ])
  ]);
  
  export const onSideNavChange = trigger('onSideNavChange', [
    state('close',
      style({
        'min-width': '50px'
      })
    ),
    state('open',
      style({
        'min-width': '200px'
      })
    ),
    transition('close => open', animate('250ms ease-in')),
    transition('open => close', animate('250ms ease-in')),
  ]);
  
  
  export const onMainContentChange = trigger('onMainContentChange', [
    state('close',
      style({
        'margin-left': '62px'
      })
    ),
    state('open',
      style({
        'margin-left': '200px'
      })
    ),
    transition('close => open', animate('250ms ease-in')),
    transition('open => close', animate('250ms ease-in')),
  ]);
  
  
  export const animateText = trigger('animateText', [
    state('hide',
      style({
        display: 'none',
        opacity: 0,
      })
    ),
    state('show',
      style({
        display: 'block',
        opacity: 1,
      })
    ),
    transition('close => open', animate('350ms ease-in')),
    transition('open => close', animate('200ms ease-out')),
  ]);