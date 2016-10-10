#lang racket

(define (delta-w x t w)
  (if (= (* x t) 1) (+ w 1)
      (- w 1)))

(define (bn t b)
  (if (= (* 1 t) 1) (+ b 1)
      (- b 1)))

(define (hebb x1 x2 t w1 w2 b)
  (cond [(and (null? x1) (null? x2) (null? t)) (list w1 w2 b)]
        [else (hebb (cdr x1)
                    (cdr x2)
                    (cdr t)
                    (delta-w (car x1) (car t) w1)
                    (delta-w (car x2) (car t) w2)
                    (bn (car t) b))]))

(define (net x1 x2 w1 w2 b)
  (+ (* w1 x1) (* w2 x2) b))

(define (fnet x1 x2 w1 w2 b teta)
  (if (>= (net x1 x2 w1 w2 b) teta) 1
      -1))

(define (nn l1 l2 ws teta)
  (let loop [(w1 (car ws))
             (w2 (cadr ws))
             (b (caddr ws))
             (x1 l1)
             (x2 l2)
             (y '())]
    (cond [(and (null? x1) (null? x2)) (reverse y)]
          [else (loop w1 w2 b (cdr x1) (cdr x2)
                      (cons (fnet (car x1)
                                  (car x2)
                                  w1
                                  w2
                                  b
                                  teta) y))])))