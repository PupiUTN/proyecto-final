 Vue.component('modal', {
    template: `
<div>
<transition name="modal'">
    <div class="modal-wrapper">
      <div class="modal-container">
        <content select=".modal-header">
          <div class="modal-header">
            <h3>
             Review
            </h3>
          </div>
        </content>
        <div class="modal-body">
           <div id="add-review" class="add-review-box">

                    <!-- Add Review -->
                    <h3 class="listing-desc-headline margin-bottom-20"> Review </h3>

                    <span class="leave-rating-title">tu  calificación para esta mascota </span>

                    <!-- Rating / Upload Button -->
                    <div class="row">
                        <div class="col-md-6">
                            <!-- Leave Rating -->
                            <div class="clearfix"></div>
                            <div class="leave-rating margin-bottom-30">
                                <input type="radio" name="rating" id="rating-1" value="1"/>
                                <label for="rating-1" class="fa fa-star"></label>
                                <input type="radio" name="rating" id="rating-2" value="2"/>
                                <label for="rating-2" class="fa fa-star"></label>
                                <input type="radio" name="rating" id="rating-3" value="3"/>
                                <label for="rating-3" class="fa fa-star"></label>
                                <input type="radio" name="rating" id="rating-4" value="4"/>
                                <label for="rating-4" class="fa fa-star"></label>
                                <input type="radio" name="rating" id="rating-5" value="5"/>
                                <label for="rating-5" class="fa fa-star"></label>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>

                    <!-- Review Comment -->
                    <form id="add-comment" class="add-comment">
                        <fieldset>


                            <div>
                                <label>Review:</label>
                                <textarea cols="40" rows="3"></textarea>
                            </div>

                        </fieldset>

                        <button class="button">Enviar Review</button>
                        <div class="clearfix"></div>
                    </form>

                </div>
                 <div class="modal-footer uk-clearfix">
                <slot name="footer">
                    <button class="modal-default-button" onclick="showModal = false">
                        Cerrar
                    </button>
                </slot>
            </div>
        </div>
       
      </div>
    </div>
  </transition>
</div>
 
`,
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    }
});