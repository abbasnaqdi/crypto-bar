const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
let d = new St.DrawingArea();
d.connect('repaint', (area) => {
    let cr = area.get_context();
    cr.setSourceRGBA(1, 1, 1, 1);
    cr.setLineWidth(1.5);
    cr.moveTo(0, 0);
    cr.lineTo(10, 10);
    cr.stroke();
});
d.queue_repaint();
print("OK");
